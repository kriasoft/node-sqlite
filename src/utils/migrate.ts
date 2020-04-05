import * as fs from 'fs'
import * as path from 'path'
import { Database } from '../Database'
import { IMigrate } from '../interfaces'

import MigrationFile = IMigrate.MigrationFile
import MigrationParams = IMigrate.MigrationParams

/**
 * Migrates database schema to the latest version
 */
export async function migrate (db: Database, config: MigrationParams = {}) {
  config.force = config.force || false
  config.table = config.table || 'migrations'
  config.migrationsPath =
    config.migrationsPath || path.join(process.cwd(), 'migrations')

  const { force, table, migrationsPath } = config

  /* eslint-disable no-await-in-loop */
  const location = path.resolve(migrationsPath)

  // Get the list of migration files, for example:
  //   { id: 1, name: 'initial', filename: '001-initial.sql' }
  //   { id: 2, name: 'feature', filename: '002-feature.sql' }
  const migrations = await new Promise<MigrationFile[]>((resolve, reject) => {
    fs.readdir(location, (err, files) => {
      if (err) {
        return reject(err)
      }

      resolve(
        files
          .map(x => x.match(/^(\d+).(.*?)\.sql$/))
          .filter(x => x !== null)
          .map(x => ({ id: Number(x[1]), name: x[2], filename: x[0] }))
          .sort((a, b) => Math.sign(a.id - b.id))
      )
    })
  })

  if (!migrations.length) {
    throw new Error(`No migration files found in '${location}'.`)
  }

  // Get the list of migrations, for example:
  //   { id: 1, name: 'initial', filename: '001-initial.sql', up: ..., down: ... }
  //   { id: 2, name: 'feature', filename: '002-feature.sql', up: ..., down: ... }
  await Promise.all(
    migrations.map(
      migration =>
        new Promise((resolve, reject) => {
          const filename = path.join(location, migration.filename)
          fs.readFile(filename, 'utf-8', (err, data) => {
            if (err) {
              return reject(err)
            }

            const [up, down] = data.split(/^--\s+?down\b/im)
            if (!down) {
              const message = `The ${migration.filename} file does not contain '-- Down' separator.`
              return reject(new Error(message))
            }

            /* eslint-disable no-param-reassign */
            migration.up = up.replace(/^-- .*?$/gm, '').trim() // Remove comments
            migration.down = down.trim() // and trim whitespaces
            /* eslint-enable no-param-reassign */
            resolve()
          })
        })
    )
  )

  // Create a database table for migrations meta data if it doesn't exist
  await db.run(`CREATE TABLE IF NOT EXISTS "${table}" (
  id   INTEGER PRIMARY KEY,
  name TEXT    NOT NULL,
  up   TEXT    NOT NULL,
  down TEXT    NOT NULL
)`)

  // Get the list of already applied migrations
  let dbMigrations = await db.all(
    `SELECT id, name, up, down FROM "${table}" ORDER BY id ASC`
  )

  // Undo migrations that exist only in the database but not in files,
  // also undo the last migration if the `force` option is enabled.
  const lastMigration = migrations[migrations.length - 1]
  for (const migration of dbMigrations
    .slice()
    .sort((a, b) => Math.sign(b.id - a.id))) {
    if (
      !migrations.some(x => x.id === migration.id) ||
      (force && migration.id === lastMigration.id)
    ) {
      await db.run('BEGIN')
      try {
        await db.exec(migration.down)
        await db.run(`DELETE FROM "${table}" WHERE id = ?`, migration.id)
        await db.run('COMMIT')
        dbMigrations = dbMigrations.filter(x => x.id !== migration.id)
      } catch (err) {
        await db.run('ROLLBACK')
        throw err
      }
    } else {
      break
    }
  }

  // Apply pending migrations
  const lastMigrationId = dbMigrations.length
    ? dbMigrations[dbMigrations.length - 1].id
    : 0
  for (const migration of migrations) {
    if (migration.id > lastMigrationId) {
      await db.run('BEGIN')
      try {
        await db.exec(migration.up)
        await db.run(
          `INSERT INTO "${table}" (id, name, up, down) VALUES (?, ?, ?, ?)`,
          migration.id,
          migration.name,
          migration.up,
          migration.down
        )
        await db.run('COMMIT')
      } catch (err) {
        await db.run('ROLLBACK')
        throw err
      }
    }
  }
}
