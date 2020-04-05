import * as sqlite from 'sqlite3'
import { ISqlite } from './interfaces'

/**
 * Promisified wrapper for the sqlite3#Statement interface.
 */
export class Statement<S extends sqlite.Statement = sqlite.Statement> {
  stmt: S

  constructor (stmt: S) {
    this.stmt = stmt
  }

  /**
   * Returns the underlying sqlite3 Statement instance
   */
  getStatementInstance (): S {
    return this.stmt
  }

  /**
   * Binds parameters to the prepared statement.
   *
   * Binding parameters with this function completely resets the statement object and row cursor
   * and removes all previously bound parameters, if any.
   */
  bind (...params: any[]): Promise<void> {
    return new Promise((resolve, reject) => {
      this.stmt.bind(...params, err => {
        if (err) {
          return reject(err)
        }

        resolve()
      })
    })
  }

  /**
   * Resets the row cursor of the statement and preserves the parameter bindings.
   * Use this function to re-execute the same query with the same bindings.
   */
  reset (): Promise<void> {
    return new Promise(resolve => {
      this.stmt.reset(() => {
        resolve()
      })
    })
  }

  /**
   * Finalizes the statement. This is typically optional, but if you experience long delays before
   * the next query is executed, explicitly finalizing your statement might be necessary.
   * This might be the case when you run an exclusive query (see section Control Flow).
   * After the statement is finalized, all further function calls on that statement object
   * will throw errors.
   */
  finalize (): Promise<void> {
    return new Promise((resolve, reject) => {
      this.stmt.finalize(err => {
        if (err) {
          return reject(err)
        }

        resolve()
      })
    })
  }

  /**
   * Binds parameters and executes the statement.
   *
   * If you specify bind parameters, they will be bound to the statement before it is executed.
   * Note that the bindings and the row cursor are reset when you specify even a single bind parameter.
   *
   * The execution behavior is identical to the Database#run method with the difference that the
   * statement will not be finalized after it is run. This means you can run it multiple times.
   *
   * @param {any} [params, ...] When the SQL statement contains placeholders, you
   * can pass them in here. They will be bound to the statement before it is
   * executed. There are three ways of passing bind parameters: directly in
   * the function's arguments, as an array, and as an object for named
   * parameters. This automatically sanitizes inputs.
   */
  run (...params: any[]): Promise<ISqlite.RunResult> {
    return new Promise((resolve, reject) => {
      const stmt = this

      this.stmt.run(...params, function (err) {
        if (err) {
          return reject(err)
        }

        resolve({
          stmt,
          lastID: this.lastID,
          changes: this.changes
        })
      })
    })
  }

  /**
   * Binds parameters, executes the statement and retrieves the first result row.
   * The parameters are the same as the Statement#run function, with the following differences:
   *
   * Using this method can leave the database locked, as the database awaits further
   * calls to Statement#get to retrieve subsequent rows. To inform the database that you
   * are finished retrieving rows, you should either finalize (with Statement#finalize)
   * or reset (with Statement#reset) the statement.
   *
   * @param {any} [params, ...] When the SQL statement contains placeholders, you
   * can pass them in here. They will be bound to the statement before it is
   * executed. There are three ways of passing bind parameters: directly in
   * the function's arguments, as an array, and as an object for named
   * parameters. This automatically sanitizes inputs.
   */
  get<T = any> (...params: any[]): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
      this.stmt.get(...params, (err, row?: T) => {
        if (err) {
          return reject(err)
        }

        resolve(row)
      })
    })
  }

  /**
   * Binds parameters, executes the statement and calls the callback with all result rows.
   * The parameters are the same as the Statement#run function, with the following differences:
   *
   * If the result set is empty, it will resolve to an empty array, otherwise it contains an
   * object for each result row which in turn contains the values of that row.
   * Like with Statement#run, the statement will not be finalized after executing this function.
   *
   * @param {any} [params, ...] When the SQL statement contains placeholders, you
   * can pass them in here. They will be bound to the statement before it is
   * executed. There are three ways of passing bind parameters: directly in
   * the function's arguments, as an array, and as an object for named
   * parameters. This automatically sanitizes inputs.
   *
   * @see https://github.com/mapbox/node-sqlite3/wiki/API#databaseallsql-param--callback
   */
  all<T = any[]> (...params: any[]): Promise<T> {
    return new Promise((resolve, reject) => {
      this.stmt.all(...params, (err, rows?: T) => {
        if (err) {
          return reject(err)
        }

        resolve(rows)
      })
    })
  }

  /**
   * Binds parameters, executes the statement and calls the callback for each result row.
   *
   * If the result set succeeds but is empty, the callback is never called.
   * In all other cases, the callback is called once for every retrieved row.
   * The order of calls correspond exactly to the order of rows in the result set.
   *
   * Like with Statement#run, the statement will not be finalized after executing this function.
   *
   * There is currently no way to abort execution!
   *
   * The last parameter to each() *must* be a callback function, where the first parameter will
   * be the returned row.
   *
   * @example await stmt.each('someParamValue', (err, row) => {
   *   // row contains the row data
   *   // each() resolves when there are no more rows to fetch
   * })
   *
   * @see https://github.com/mapbox/node-sqlite3/wiki/API#statementeachparam--callback-complete
   * @returns Promise<number> Number of rows returned
   */
  each<T = any> (...params: any[]): Promise<number> {
    return new Promise((resolve, reject) => {
      const callback: (err, row: T) => void = params.pop()

      if (!callback || typeof callback !== 'function') {
        throw new Error(
          'sqlite: Last param of Statement#each() must be a callback function'
        )
      }

      this.stmt.each(
        ...params,
        (err, row) => {
          if (err) {
            return callback(err, null)
          }

          callback(null, row)
        },
        (err, count) => {
          if (err) {
            return reject(err)
          }

          resolve(count)
        }
      )
    })
  }
}
