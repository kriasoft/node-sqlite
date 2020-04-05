/* eslint-env jest */

import * as sqlite3Offline from 'sqlite3-offline'
import { open } from '..'
import * as sqlite3 from 'sqlite3'

describe('index', () => {
  // enable the sqlite cached database or not
  const driver = [
    {
      cached: false,
      driver: sqlite3.Database
    },
    {
      cached: true,
      driver: sqlite3.cached.Database
    }
  ]

  driver.forEach(c => {
    it(`should create an instance of sqlite3, cached = ${c.cached}`, async () => {
      const db = await open({
        filename: ':memory:',
        driver: c.driver
      })

      await db.migrate()

      const result = await db.all('SELECT id, name FROM migrations')
      expect(result).toEqual([
        { id: 1, name: 'initial' },
        { id: 2, name: 'some-feature' },
        { id: 3, name: 'test-cert' }
      ])

      await db.close()
    })
  })

  it('should allow a custom driver', async () => {
    const db = await open({
      filename: ':memory:',
      driver: sqlite3Offline.Database
    })

    await db.migrate()

    const result = await db.all('SELECT id, name FROM migrations')
    expect(result).toEqual([
      { id: 1, name: 'initial' },
      { id: 2, name: 'some-feature' },
      { id: 3, name: 'test-cert' }
    ])

    await db.close()
  })

  describe('typings', () => {
    it('should allow for a generic driver type definition', async () => {
      const db = await open<sqlite3.Database>({
        filename: ':memory:',
        driver: sqlite3.Database
      })

      await db.close()
    })

    it('should allow for a generic driver and statement type definition', async () => {
      const db = await open<sqlite3.Database, sqlite3.Statement>({
        filename: ':memory:',
        driver: sqlite3.Database
      })

      await db.close()
    })
  })
})
