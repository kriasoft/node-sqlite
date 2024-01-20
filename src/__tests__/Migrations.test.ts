/* eslint-env jest */

import { Migrations } from '../Migrations'
import { Database } from '../Database'
import * as sqlite3 from 'sqlite3'

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
    console.log('heer')

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
})
