import * as sqlite3 from 'sqlite3'
import { ISqlite, IMigrate } from './interfaces'

import { Statement } from './Statement'
import { migrate, readMigrations } from './utils/migrate'
import { toSqlParams } from './utils/strings'

import MigrationParams = IMigrate.MigrationParams
import { formatError } from './utils/format-error'

/**
 * Promisified wrapper for the sqlite3#Database interface.
 */
export class Database<
  Driver extends sqlite3.Database = sqlite3.Database,
  Stmt extends sqlite3.Statement = sqlite3.Statement
> {
  config: ISqlite.Config
  db: Driver

  constructor (config: ISqlite.Config) {
    this.config = config
    this.db = null
  }

  /**
   * Event handler when verbose mode is enabled.
   * @see https://github.com/mapbox/node-sqlite3/wiki/Debugging
   */
  on (event: string, listener) {
    this.db.on(event, listener)
  }

  /**
   * Returns the underlying sqlite3 Database instance
   */
  getDatabaseInstance (): Driver {
    return this.db
  }

  /**
   * Opens the database
   */
  open (): Promise<void> {
    return new Promise((resolve, reject) => {
      let { filename, mode, driver } = this.config

      // https://github.com/mapbox/node-sqlite3/wiki/API#new-sqlite3databasefilename-mode-callback
      if (filename === null || filename === undefined) {
        throw new Error('sqlite: filename cannot be null / undefined')
      }

      if (!driver) {
        throw new Error('sqlite: driver is not defined')
      }

      if (mode) {
        this.db = new driver(filename, mode, err => {
          if (err) {
            return reject(formatError(err))
          }

          resolve()
        })
      } else {
        this.db = new driver(filename, err => {
          if (err) {
            return reject(formatError(err))
          }

          resolve()
        })
      }
    })
  }

  /**
   * Closes the database.
   */
  close (): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.close(err => {
        if (err) {
          return reject(formatError(err))
        }

        resolve()
      })
    })
  }

  /**
   * @see https://github.com/mapbox/node-sqlite3/wiki/API#databaseconfigureoption-value
   */
  configure (option: ISqlite.ConfigureOption, value: any): any {
    this.db.configure(option as any, value)
  }

  /**
   * Runs the SQL query with the specified parameters. It does not retrieve any result data.
   * The function returns the Database object for which it was called to allow for function chaining.
   *
   * @param {string} sql The SQL query to run.
   *
   * @param {any} [params, ...] When the SQL statement contains placeholders, you
   * can pass them in here. They will be bound to the statement before it is
   * executed. There are three ways of passing bind parameters: directly in
   * the function's arguments, as an array, and as an object for named
   * parameters. This automatically sanitizes inputs.
   *
   * @see https://github.com/mapbox/node-sqlite3/wiki/API#databaserunsql-param--callback
   */
  run (
    sql: ISqlite.SqlType,
    ...params: any[]
  ): Promise<ISqlite.RunResult<Stmt>> {
    return new Promise((resolve, reject) => {
      const sqlObj = toSqlParams(sql, params)

      this.db.run(sqlObj.sql, ...sqlObj.params, function (err) {
        if (err) {
          return reject(formatError(err))
        }

        resolve({
          stmt: new Statement<Stmt>(this.stmt),
          lastID: this.lastID,
          changes: this.changes
        })
      })
    })
  }

  /**
   * Runs the SQL query with the specified parameters and resolves with
   * with the first result row afterwards. If the result set is empty, returns undefined.
   *
   * The property names correspond to the column names of the result set.
   * It is impossible to access them by column index; the only supported way is by column name.
   *
   * @param {string} sql The SQL query to run.
   *
   * @param {any} [params, ...] When the SQL statement contains placeholders, you
   * can pass them in here. They will be bound to the statement before it is
   * executed. There are three ways of passing bind parameters: directly in
   * the function's arguments, as an array, and as an object for named
   * parameters. This automatically sanitizes inputs.
   *
   * @see https://github.com/mapbox/node-sqlite3/wiki/API#databasegetsql-param--callback
   */
  get<T = any> (
    sql: ISqlite.SqlType,
    ...params: any[]
  ): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
      const sqlObj = toSqlParams(sql, params)

      this.db.get(sqlObj.sql, ...sqlObj.params, (err, row?: T) => {
        if (err) {
          return reject(formatError(err))
        }

        resolve(row)
      })
    })
  }

  /**
   * Runs the SQL query with the specified parameters and calls the callback once for each result
   * row. The parameters are the same as the Database#run function, with the following differences:
   *
   * If the result set succeeds but is empty, the callback is never called.
   * In all other cases, the callback is called once for every retrieved row.
   * The order of calls correspond exactly to the order of rows in the result set.
   *
   * There is currently no way to abort execution!
   *
   * The last parameter to each() *must* be a callback function.
   *
   * @example await db.each('SELECT * FROM x WHERE y = ?', 'z', (err, row) => {
   *   // row contains the row data
   *   // each() resolves when there are no more rows to fetch
   * })
   *
   * @see https://github.com/mapbox/node-sqlite3/wiki/API#databaseeachsql-param--callback-complete
   * @returns Promise<number> Number of rows returned
   */
  each<T = any> (
    sql: ISqlite.SqlType,
    callback: (err: any, row: T) => void
  ): Promise<number>
  each<T = any> (
    sql: ISqlite.SqlType,
    param1: any,
    callback: (err: any, row: T) => void
  ): Promise<number>
  each<T = any> (
    sql: ISqlite.SqlType,
    param1: any,
    param2: any,
    callback: (err: any, row: T) => void
  ): Promise<number>
  each<T = any> (
    sql: ISqlite.SqlType,
    param1: any,
    param2: any,
    param3: any,
    callback: (err: any, row: T) => void
  ): Promise<number>
  each<T = any> (sql: ISqlite.SqlType, ...params: any[]): Promise<number>
  each<T = any> (sql: ISqlite.SqlType, ...params: any[]): Promise<number> {
    return new Promise((resolve, reject) => {
      const callback: (err, row: T) => void = params.pop()

      if (!callback || typeof callback !== 'function') {
        throw new Error(
          'sqlite: Last param of Database#each() must be a callback function'
        )
      }

      if (params.length > 0) {
        const positional = params.pop()

        if (typeof positional === 'function') {
          throw new Error(
            'sqlite: Database#each() should only have a single callback defined. See readme for usage.'
          )
        }

        params.push(positional)
      }

      const sqlObj = toSqlParams(sql, params)

      this.db.each(
        sqlObj.sql,
        ...sqlObj.params,
        (err, row) => {
          if (err) {
            return callback(formatError(err), null)
          }

          callback(null, row)
        },
        (err, count) => {
          if (err) {
            return reject(formatError(err))
          }

          resolve(count)
        }
      )
    })
  }

  /**
   * Runs the SQL query with the specified parameters. The parameters are the same as the
   * Database#run function, with the following differences:
   *
   * If the result set is empty, it will be an empty array, otherwise it will
   * have an object for each result row which
   * in turn contains the values of that row, like the Database#get function.
   *
   * Note that it first retrieves all result rows and stores them in memory.
   * For queries that have potentially large result sets, use the Database#each
   * function to retrieve all rows or Database#prepare followed by multiple
   * Statement#get calls to retrieve a previously unknown amount of rows.
   *
   * @param {string} sql The SQL query to run.
   *
   * @param {any} [params, ...] When the SQL statement contains placeholders, you
   * can pass them in here. They will be bound to the statement before it is
   * executed. There are three ways of passing bind parameters: directly in
   * the function's arguments, as an array, and as an object for named
   * parameters. This automatically sanitizes inputs.
   *
   * @see https://github.com/mapbox/node-sqlite3/wiki/API#databaseallsql-param--callback
   */
  all<T = any[]> (sql: ISqlite.SqlType, ...params: any[]): Promise<T> {
    return new Promise((resolve, reject) => {
      const sqlObj = toSqlParams(sql, params)

      this.db.all(sqlObj.sql, ...sqlObj.params, (err, rows?: T) => {
        if (err) {
          return reject(formatError(err))
        }

        resolve(rows)
      })
    })
  }

  /**
   * Runs all SQL queries in the supplied string. No result rows are retrieved. If a query fails,
   * no subsequent statements will be executed (wrap it in a transaction if you want all
   * or none to be executed).
   *
   * Note: This function will only execute statements up to the first NULL byte.
   * Comments are not allowed and will lead to runtime errors.
   *
   * @param {string} sql The SQL query to run.
   * @see https://github.com/mapbox/node-sqlite3/wiki/API#databaseexecsql-callback
   */
  exec (sql: ISqlite.SqlType): Promise<void> {
    return new Promise((resolve, reject) => {
      const sqlObj = toSqlParams(sql)

      this.db.exec(sqlObj.sql, err => {
        if (err) {
          return reject(formatError(err))
        }

        resolve()
      })
    })
  }

  /**
   * Prepares the SQL statement and optionally binds the specified parameters.
   * When bind parameters are supplied, they are bound to the prepared statement.
   *
   * @param {string} sql The SQL query to run.
   * @param {any} [params, ...] When the SQL statement contains placeholders, you
   * can pass them in here. They will be bound to the statement before it is
   * executed. There are three ways of passing bind parameters: directly in
   * the function's arguments, as an array, and as an object for named
   * parameters. This automatically sanitizes inputs.
   * @returns Promise<Statement> Statement object
   */
  prepare (sql: ISqlite.SqlType, ...params: any[]): Promise<Statement<Stmt>> {
    return new Promise((resolve, reject) => {
      const sqlObj = toSqlParams(sql, params)

      const stmt = this.db.prepare(sqlObj.sql, ...sqlObj.params, err => {
        if (err) {
          return reject(err)
        }

        resolve(new Statement<Stmt>(stmt))
      }) as Stmt
    })
  }

  /**
   * Loads a compiled SQLite extension into the database connection object.
   *
   * @param {string} path Filename of the extension to load
   */
  loadExtension (path: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.loadExtension(path, err => {
        if (err) {
          return reject(formatError(err))
        }

        resolve()
      })
    })
  }

  /**
   * Performs a database migration.
   */
  async migrate (config?: MigrationParams) {
    await migrate(this, config)
  }

  /**
   * Performs a database migration read operation.
   * @returns List of objects with name, id of migrations and SQL code for up and down migration
   * You can run up and down with `db.exec(migrations[0].up)` or `db.exec(migrations[0].down)`. Or with other commands that can run SQL code.
   */
  readMigrations (migrationPath?: string): Promise<IMigrate.MigrationData[]> {
    return readMigrations(migrationPath)
  }

  /**
   * The methods underneath requires creative work to implement. PRs / proposals accepted!
   */

  /*
   * Unsure if serialize can be made into a promise.
   */
  serialize () {
    throw new Error(
      'sqlite: Currently not implemented. Use getDatabaseInstance().serialize() instead.'
    )
  }

  /*
   * Unsure if parallelize can be made into a promise.
   */
  parallelize () {
    throw new Error(
      'sqlite: Currently not implemented. Use getDatabaseInstance().parallelize() instead.'
    )
  }
}
