/* eslint-env jest */

import { migrate, readMigrations } from '../migrate'
import { Database } from '../../Database'
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
    await migrate(db)

    let result = await db.all('SELECT id, name FROM migrations')
    expect(result).toEqual([
      { id: 1, name: 'initial' },
      { id: 2, name: 'some-feature' },
      { id: 3, name: 'test-cert' },
      { id: 4, name: 'no-down' }
    ])

    result = await db.all('SELECT * FROM Category')
    expect(result).toEqual([{ id: 1, name: 'Test' }])

    await migrate(db, {
      force: true
    })

    result = await db.all('SELECT certificate from whatever')

    expect(result[0].certificate).toBe(
      '-----BEGIN CERTIFICATE-----\nsome contents\n-----END CERTIFICATE-----'
    )

    result = await db.all('SELECT value from downless')

    expect(result[0].value).toBe('down migration is optional')

    await db.close()
  })

  it('Should migrate the database without reading disk', async () => {
    let migrations = await readMigrations()
    migrations = migrations.slice(0, 2)

    await migrate(db, { migrations })

    let result = await db.all('SELECT id, name FROM migrations')
    expect(result).toEqual([
      { id: 1, name: 'initial' },
      { id: 2, name: 'some-feature' }
    ])

    result = await db.all('SELECT * FROM Category')
    expect(result).toEqual([{ id: 1, name: 'Test' }])

    await db.close()
  })
})
