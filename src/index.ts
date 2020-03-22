import sqlite3 from 'sqlite3'

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
  driver?: any

  /**
   * If true, uses the `sqlite3` built-in database object cache to avoid opening the same
   * database multiple times.
   *
   * Does not apply if `driver` is defined.
   *
   * @see https://github.com/mapbox/node-sqlite3/wiki/Caching
   */
  cached?: boolean

  /**
   * Enables verbose mode.
   *
   * This only applies to the `sqlite3` driver.
   */
  verbose?: boolean
}

async function open (config: OpenParams): Promise<Sqlite3Database> {
  let driver = config.driver || sqlite3.Database

  if (!config.driver && config.cached) {
    driver = sqlite3.cached.Database
  }

  if (config.verbose) {
    sqlite3.verbose()
  }

  const db = new Sqlite3Database({
    ...config,
    driver
  })

  await db.open()

  return db
}

export { open, Sqlite3Statement, Sqlite3Database, Sqlite3 }
