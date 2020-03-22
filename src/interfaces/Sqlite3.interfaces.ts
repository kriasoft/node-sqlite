/* eslint-disable */
import * as sqlite from 'sqlite3'
import { SQLStatement } from 'sql-template-strings'
import { Sqlite3Statement } from '../sqlite3/Sqlite3Statement'

export interface SqlObj {
  sql: string
  params?: any[]
}

export namespace Sqlite3 {
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
    mode?: OpenDatabaseEnum
  }

  export interface DatabaseConfigParams extends Config {
    /**
     * Use an alternative library instead of sqlite3. The interface of the library must
     * conform to sqlite3.
     */
    driver: any
  }

  export enum OpenDatabaseEnum {
    OPEN_READONLY = sqlite.OPEN_READONLY,
    OPEN_READWRITE = sqlite.OPEN_READWRITE,
    OPEN_CREATE = sqlite.OPEN_CREATE
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
    stmt: Sqlite3Statement
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
