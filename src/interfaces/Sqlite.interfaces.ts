import { SQLStatement } from 'sql-template-strings'
import { Statement } from '../Statement'

export interface SqlObj {
  sql: string
  params?: any[]
}

export namespace ISqlite {
  /**
   * Allows for input of a normal SQL string or
   * `sql-template-strings` object
   */
  export type SqlType = SQLStatement | string

  export interface Config {
    /**
     * Valid values are filenames, ":memory:" for an anonymous in-memory
     * database and an empty string for an anonymous disk-based database.
     * Anonymous databases are not persisted and when closing the database
     * handle, their contents are lost.
     */
    filename: string

    /**
     * One or more of sqlite3.OPEN_READONLY, sqlite3.OPEN_READWRITE and
     * sqlite3.OPEN_CREATE. The default value is OPEN_READWRITE | OPEN_CREATE.
     */
    mode?: number

    /**
     * The database driver. Most will install `sqlite3` and use the `Database` class from it.
     * As long as the library you are using conforms to the `sqlite3` API, you can use it as
     * the driver.
     *
     * @example
     *
     * ```
     * import sqlite from 'sqlite3'
     *
     * const driver = sqlite.Database
     * ```
     */
    driver: any
  }

  export type ConfigureOption = 'trace' | 'profile' | 'busyTimeout'

  export interface RunResult {
    /**
     * Statement object.
     *
     * It is not possible to run the statement again because it is
     * automatically finalized after running for the first time.
     * Any subsequent attempts to run the statement again will fail.
     */
    stmt: Statement
    /**
     * Row id of the inserted row.
     *
     * Only contains valid information when the query was a successfully
     * completed INSERT statement.
     */
    lastID?: number
    /**
     * Number of rows changed.
     *
     * Only contains valid information when the query was a
     * successfully completed UPDATE or DELETE statement.
     */
    changes?: number
  }
}
