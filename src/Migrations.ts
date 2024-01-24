import * as path from 'node:path'
import * as fsp from 'node:fs/promises'

import { Database } from './Database'
import { IMigrate } from './interfaces'

import MigrationFile = IMigrate.MigrationFile
import MigrationData = IMigrate.MigrationData
import MigrationParams = IMigrate.MigrationParams

const DEFAULT_MIGRATIONS_DIR_NAME = 'migrations'
const DEFAULT_MIGRATIONS_DIR_PATH = path.join(
  process.cwd(),
  DEFAULT_MIGRATIONS_DIR_NAME
)

const MIGRATION_FILE_REGEXP = /^(\d+).(.*?)\.sql$/
const MIGRATION_FILE_UP_REGEXP = /^-- .*$/gm
const MIGRATION_FILE_DOWN_REGEXP = /^--\s+?down\b/im
const MIGRATION_FILE_REPLACE_COMMAND_REGEXP = /^-{3,}$/gim

export class Migrations<Driver extends Database> {
  db: Driver
  config: MigrationParams

  constructor (db: Driver, config?: MigrationParams) {
    this.db = db
    this.config = {
      force: false,
      table: DEFAULT_MIGRATIONS_DIR_NAME,
      ...config,
      migrationsPath: path.resolve(
        config?.migrationsPath ?? DEFAULT_MIGRATIONS_DIR_PATH
      )
    }
  }

  /**
   * Performs a database migration read operation.
   *
   * You can run up and down with `db.exec(migrations[0].up)` or `db.exec(migrations[0].down)`. Or with other commands that can run SQL code.
   *
   * @param migrationPath path to migration folder can be relative or absolute. If not found uses current working directory
   * @returns IMigrate.MigrationData[]. List of objects with name, id of migrations and SQL code for up and down migration.
   *
   * Get the list of migrations, for example:
   *  { id: 1, name: 'initial', filename: '001-initial.sql', up: ..., down: ... }
   *  { id: 2, name: 'feature', filename: '002-feature.sql', up: ..., down: ... }
   */
  async readMigrations (): Promise<MigrationData[]> {
    const migrationFiles = await this.getMigrationFiles()
    if (!migrationFiles.length) {
      throw new Error(
        `No migration files found in '${this.config.migrationsPath}'.`
      )
    }

    return Promise.all(
      migrationFiles.map(migration => this.readMigrationData(migration))
    )
  }

  // TODO: propose to make method GetInstance of the Migrations class, which will be async and we will call
  // `downMigrations` and `upNewMigrations` functions in the migrate method. And user can call these
  // `downMigrations` and `upNewMigrations` functions when ever he wants it
  /**
   * Performs a database migration.
   *
   * Migrates database schema to the latest version. Filename option is present
   * in the the MigrationData if `readMigrations` function executes or user can put filename
   * for each migration in the config.migrations
   */
  async migrate (): Promise<void> {
    const migrations = this.config.migrations ?? (await this.readMigrations())

    // Create a database table for migrations meta data if it doesn't exist
    await this.createMigrationsTable()

    // Get the list of already applied migrations
    let appliedMigrations = await this.selectAllMigrationsData()

    await this.downMigrations(appliedMigrations, migrations)
    await this.upNewMigrations(appliedMigrations, migrations)
  }

  /**
   * Apply pending migrations
   *
   * @param appliedMigrations exists migrations in the `table`
   * @param migrations IMigrate.MigrationData
   */
  private async upNewMigrations (
    appliedMigrations: MigrationData[],
    migrations: readonly MigrationData[]
  ): Promise<void> {
    const lastMigrationId = appliedMigrations.length
      ? appliedMigrations[appliedMigrations.length - 1].id
      : 0
    for (const migration of migrations) {
      if (migration.id > lastMigrationId) {
        await this.db.run('BEGIN')
        try {
          await this.db.exec(migration.up)
          await this.insertMigration(migration)
          await this.db.run('COMMIT')
        } catch (err) {
          await this.db.run('ROLLBACK')
          throw err
        }
      }
    }
  }

  /**
   * Undo migrations that exist only in the database but not in files,
   * also undo the last migration if the `force` option is enabled.
   *
   * @param appliedMigrations exists migrations in the `table`
   * @param migrations IMigrate.MigrationData
   */
  private async downMigrations (
    appliedMigrations: MigrationData[],
    migrations: readonly MigrationData[]
  ): Promise<void> {
    const lastMigration = migrations[migrations.length - 1]
    for (const migration of appliedMigrations
      .slice()
      .sort((a, b) => Math.sign(b.id - a.id))) {
      if (
        !migrations.some(x => x.id === migration.id) ||
        (this.config.force && migration.id === lastMigration.id)
      ) {
        await this.db.run('BEGIN')
        try {
          await this.db.exec(migration.down)
          await this.deleteMigration(migration.id)
          await this.db.run('COMMIT')
          appliedMigrations = appliedMigrations.filter(
            x => x.id !== migration.id
          )
        } catch (err) {
          await this.db.run('ROLLBACK')
          throw err
        }
      } else {
        break
      }
    }
  }

  private async readMigrationData (
    migration: MigrationFile
  ): Promise<MigrationData> {
    const filepath = path.join(this.config.migrationsPath, migration.filename)
    const fileData = await fsp.readFile(filepath, 'utf-8')

    const [up, down] = fileData
      .split(MIGRATION_FILE_DOWN_REGEXP)
      .map(value =>
        value.replace(MIGRATION_FILE_REPLACE_COMMAND_REGEXP, '').trim()
      )

    const migrationUp = up.replace(MIGRATION_FILE_UP_REGEXP, '').trim() // Remove comments
    const migrationDown = down ? down.trim() : '' // and trim whitespaces
    return { ...migration, up: migrationUp, down: migrationDown }
  }

  /**
   * Read `location` directory and look for migration files
   *
   * @param location path to the directory with migrations files without nesting
   * @returns IMigrate.MigrationFile
   *
   * Get the list of migration files, for example:
   *  { id: 1, name: 'initial', filename: '001-initial.sql' }
   *  { id: 2, name: 'feature', filename: '002-feature.sql' }
   */
  private async getMigrationFiles (): Promise<MigrationFile[]> {
    const files = await fsp.readdir(this.config.migrationsPath)

    const filenames = files
      .map(x => MIGRATION_FILE_REGEXP.exec(x))
      .filter(x => x !== null) as RegExpMatchArray[]

    return filenames
      .map(x => ({ id: Number(x[1]), name: x[2], filename: x[0] }))
      .sort((a, b) => Math.sign(a.id - b.id))
  }

  private async createMigrationsTable (): Promise<void> {
    // Create a database table for migrations meta data if it doesn't exist
    await this.db.run(`CREATE TABLE IF NOT EXISTS "${this.config.table}" (
      id        INTEGER PRIMARY KEY,
      name      TEXT    NOT NULL,
      up        TEXT    NOT NULL,
      down      TEXT    NOT NULL,
      filename  TEXT    DEFAULT NULL
    )`)
  }

  private selectAllMigrationsData (): Promise<MigrationData[]> {
    return this.db.all<MigrationData[]>(
      `SELECT id, name, up, down, filename FROM "${this.config.table}" ORDER BY id ASC`
    )
  }

  private async insertMigration (migration: MigrationData): Promise<void> {
    await this.db.run(
      `INSERT INTO "${this.config.table}" (id, name, up, down, filename) VALUES (?, ?, ?, ?, ?)`,
      migration.id,
      migration.name,
      migration.up,
      migration.down,
      migration.filename
    )
  }

  private async deleteMigration (migrationId: number): Promise<void> {
    await this.db.run(
      `DELETE FROM "${this.config.table}" WHERE id = ?`,
      migrationId
    )
  }
}
