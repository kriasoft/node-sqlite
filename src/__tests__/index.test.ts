/* eslint-env jest */

// import * as sqlite3Offline from 'sqlite3-offline-next'
import { open } from '..'
import * as sqlite3 from 'sqlite3'

import {
  initial001,
  noDown004,
  someFeature002,
  testCert003
} from './data/migrations.data'

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
    it(`should create an instance of sqlite3, cached = ${
      c.cached
    }`, async () => {
      const db = await open({
        filename: ':memory:',
        driver: c.driver
      })

      await db.migrate()

      const result = await db.all('SELECT id, name FROM migrations')
      expect(result).toEqual([
        { id: 1, name: 'initial' },
        { id: 2, name: 'some-feature' },
        { id: 3, name: 'test-cert' },
        { id: 4, name: 'no-down' }
      ])

      await db.close()
    })
  })

  driver.forEach(c => {
    it(`should return list of migrations with name, id, down and up variables, cached = ${
      c.cached
    }`, async () => {
      // const expectedData =
      const db = await open({
        filename: ':memory:',
        driver: c.driver
      })

      await db.migrate()

      const migrations = await db.readMigrations()

      expect(migrations).toEqual([
        { id: 1, name: 'initial', up: initial001.up, down: initial001.down },
        {
          id: 2,
          name: 'some-feature',
          up: someFeature002.up,
          down: someFeature002.down
        },
        {
          id: 3,
          name: 'test-cert',
          up: testCert003.up,
          down: testCert003.down
        },
        { id: 4, name: 'no-down', up: noDown004.up, down: '' }
      ])

      await db.close()
    })
  })

  /* disabled since sqlite3-offline-next hasn't been maintained in two years
  and there are no recent builds compatible with newer versions of node
  it('should allow an anonymous database', async () => {
    const db = await open({
      filename: '',
      driver: sqlite3Offline.Database
    })

    await db.migrate()

    const result = await db.all('SELECT id, name FROM migrations')
    expect(result).toEqual([
      { id: 1, name: 'initial' },
      { id: 2, name: 'some-feature' },
      { id: 3, name: 'test-cert' },
      { id: 4, name: 'no-down' }
    ])

    await db.close()
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
      { id: 3, name: 'test-cert' },
      { id: 4, name: 'no-down' }
    ])

    await db.close()
  })
*/
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
