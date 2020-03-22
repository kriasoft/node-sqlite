import sqlite3 from 'sqlite3'
import { Statement } from './Statement'
import { Database } from './Database'
import { ISqlite } from './interfaces/Sqlite.interfaces'

async function open<Driver extends sqlite3.Database> (
  config: ISqlite.Config
): Promise<Database> {
  const db = new Database<Driver>(config)

  await db.open()

  return db
}

export { open, Statement, Database, ISqlite }
