import { Sqlite3Statement } from './sqlite3/Sqlite3Statement'
import { Sqlite3Database } from './sqlite3/Sqlite3Database'
import { Sqlite3 } from './interfaces/Sqlite3.interfaces'

export interface OpenParams extends Sqlite3.Config {
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

async function open (config: OpenParams): Promise<Sqlite3Database> {
  const db = new Sqlite3Database(config)

  await db.open()

  return db
}

export { open, Sqlite3Statement, Sqlite3Database, Sqlite3 }
