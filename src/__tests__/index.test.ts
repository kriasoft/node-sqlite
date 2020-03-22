import sqlite3Offline from 'sqlite3-offline'
import { open, Sqlite3Database } from '..'

describe('index', () => {
  const cached = [false, true]

  cached.forEach(c => {
    it(`should create an instance of sqlite3, cached = ${c}`, async () => {
      const db = await open({
        filename: ':memory:',
        cached: c
      })

      await db.migrate()

      let result = await db.all('SELECT id, name FROM migrations')
      expect(result).toEqual([
        { id: 1, name: 'initial' },
        { id: 2, name: 'some-feature' },
        { id: 3, name: 'test-cert' }
      ])

      await db.close()
    })
  })

  it('should enable verbose mode', async done => {
    const db = await open({
      filename: ':memory:',
      verbose: true
    })

    await db.open()

    db.on('trace', async () => {
      await db.close()
      done()
    })

    await db.exec('CREATE TABLE tbl (col1 TEXT, col2 TEXT, col3 TEXT)')
  })

  it('should allow a custom driver', async () => {
    const db = await open({
      filename: ':memory:',
      driver: sqlite3Offline.Database
    })

    await db.migrate()

    let result = await db.all('SELECT id, name FROM migrations')
    expect(result).toEqual([
      { id: 1, name: 'initial' },
      { id: 2, name: 'some-feature' },
      { id: 3, name: 'test-cert' }
    ])

    await db.close()
  })
})
