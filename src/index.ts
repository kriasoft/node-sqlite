import { Statement } from './Statement'
import { Database } from './Database'
import { ISqlite } from './interfaces/Sqlite.interfaces'

export interface OpenParams extends ISqlite.Config {
  /**
   * Use an alternative library instead of sqlite3. The interface of the library must
   * conform to `sqlite3`.
   *
   * The default is to use `sqlite3` as the driver.
   *
   * @see https://github.com/mapbox/node-sqlite3/wiki/API
   */
  driver: any
}

async function open (config: OpenParams): Promise<Database> {
  const db = new Database(config)

  await db.open()

  return db
}

export { open, Statement, Database, ISqlite }
