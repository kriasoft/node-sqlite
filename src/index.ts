/// <reference types="./vendor-typings/sqlite3" />

import sqlite3 from 'sqlite3'
import { Statement } from './Statement'
import { Database } from './Database'
import { ISqlite, IMigrate } from './interfaces'

/**
 * Opens a database for manipulation. Most users will call this to get started.
 */
async function open<
  Driver extends sqlite3.Database = sqlite3.Database,
  Stmt extends sqlite3.Statement = sqlite3.Statement
> (config: ISqlite.Config): Promise<Database> {
  const db = new Database<Driver, Stmt>(config)

  await db.open()

  return db
}

export { open, Statement, Database, ISqlite, IMigrate }
