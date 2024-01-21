/* eslint-env jest */

import * as sqlite3 from 'sqlite3'

import { open } from '..'
import { Migrations } from '../Migrations'
import { Database } from '../Database'

import {
  initial001,
  noDown004,
  someFeature002,
  testCert003
} from './data/migrations.data'

let db

beforeEach(async () => {
  db = new Database({
    filename: ':memory:',
    driver: sqlite3.Database
  })

  await db.open()
})

describe('migration function', () => {
  it('Should migrate the database', async () => {
    const migrationsInstance = new Migrations(db)
    await migrationsInstance.migrate()

    let result = await db.all('SELECT id, name FROM migrations')
    expect(result).toEqual([
      { id: 1, name: 'initial' },
      { id: 2, name: 'some-feature' },
      { id: 3, name: 'test-cert' },
      { id: 4, name: 'no-down' }
    ])

    result = await db.all('SELECT * FROM Category')
    expect(result).toEqual([{ id: 1, name: 'Test' }])

    const migrationsInstanceForce = new Migrations(db, { force: true })
    await migrationsInstanceForce.migrate()

    result = await db.all('SELECT certificate FROM whatever')

    expect(result[0].certificate).toBe(
      '-----BEGIN CERTIFICATE-----\nsome contents\n-----END CERTIFICATE-----'
    )

    result = await db.all('SELECT value from downless')

    expect(result[0].value).toBe('down migration is optional')

    await db.close()
  })

  it('Should migrate the database without reading disk', async () => {
    const migrationsInstanceMigrations = new Migrations(db)

    let migrations = await migrationsInstanceMigrations.readMigrations()
    migrations = migrations.slice(0, 2)

    const migrationsInstance = new Migrations(db, { migrations })
    await migrationsInstance.migrate()

    let result = await db.all('SELECT id, name FROM "migrations"')
    expect(result).toEqual([
      { id: 1, name: 'initial' },
      { id: 2, name: 'some-feature' }
    ])

    result = await db.all('SELECT * FROM Category')
    expect(result).toEqual([{ id: 1, name: 'Test' }])

    await db.close()
  })

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
    it(`should return list of migrations with name, id, down and up variables, cached = ${c.cached}`, async () => {
      // const expectedData =
      const dbDriver = await open({
        filename: ':memory:',
        driver: c.driver
      })

      await dbDriver.migrate()

      const migrationsInstance = new Migrations(dbDriver)
      const migrations = await migrationsInstance.readMigrations()

      expect(migrations).toEqual([
        {
          id: 1,
          name: 'initial',
          up: initial001.up,
          down: initial001.down,
          filename: '001-initial.sql'
        },
        {
          id: 2,
          name: 'some-feature',
          up: someFeature002.up,
          down: someFeature002.down,
          filename: '002-some-feature.sql'
        },
        {
          id: 3,
          name: 'test-cert',
          up: testCert003.up,
          down: testCert003.down,
          filename: '003-test-cert.sql'
        },
        {
          id: 4,
          name: 'no-down',
          up: noDown004.up,
          down: '',
          filename: '004-no-down.sql'
        }
      ])

      await dbDriver.close()
    })
  })
})
