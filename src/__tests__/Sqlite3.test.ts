/* eslint-env jest */

import { Database } from '../Database'
import SQL from 'sql-template-strings'
import * as sqlite3 from 'sqlite3'
import { Migrations, open } from '..'

let db: Database

describe('Sqlite3Database', () => {
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
    db = new Database({
      driver: c.driver,
      filename: ':memory:'
    })

    it(`should open a database connection cached = ${c.cached}`, async () => {
      await db.open()
      await db.exec('CREATE TABLE tbl (col TEXT)')
      await db.exec('INSERT INTO tbl VALUES ("test")')
      let result

      result = await db.get('SELECT col FROM tbl')
      expect(result).toEqual({ col: 'test' })

      result = await db.all('SELECT col FROM tbl')
      expect(result).toEqual([{ col: 'test' }])

      result = await db.all('SELECT * FROM tbl WHERE col = ?', 'test')
      expect(result.length).toBe(1)

      result = await db.all('SELECT * FROM tbl WHERE col = ?', ['test'])
      expect(result.length).toBe(1)

      result = await db.all('SELECT * FROM tbl WHERE col = :test', {
        ':test': 'test'
      })
      expect(result.length).toBe(1)

      result = await db.run(
        'UPDATE tbl SET col = ? WHERE col = ?',
        'foo',
        'test'
      )
      expect(result.lastID).toBe(1)
      expect(result.changes).toBe(1)
      expect(result.stmt).toBeDefined()

      result = await db.get('SELECT col FROM tbl')

      expect(result).toEqual({ col: 'foo' })

      await db.close()
    })
  })

  it('should open with a custom mode', async () => {
    db = new Database({
      filename: ':memory:',
      driver: sqlite3.Database,
      mode: sqlite3.OPEN_READONLY
    })

    await db.open()

    try {
      await db.exec('CREATE TABLE tbl (col TEXT)')
    } catch (e) {
      expect(e.message).toEqual(
        'SQLITE_READONLY: attempt to write a readonly database'
      )
    }
  })

  it('should have stack traces on errors', async () => {
    db = new Database({
      filename: ':memory:',
      driver: sqlite3.Database
    })

    await db.open()

    try {
      await db.all('abcd')
    } catch (e) {
      expect(e.stack).toBeDefined()
      // In the native errors, the stack was filled with the message value
      expect(e.stack).not.toEqual(e.message)
    }
  })

  it('should allow named parameters to be used', async () => {
    db = new Database({
      filename: ':memory:',
      driver: sqlite3.Database
    })

    await db.open()
    await db.exec('CREATE TABLE tbl (col TEXT)')

    let result = await db.run('INSERT INTO tbl(col) VALUES (:col)', {
      ':col': 'something'
    })

    expect(result.lastID).toBe(1)

    result = await db.get('SELECT col FROM tbl WHERE 1 = ? AND 5 = ?5', {
      1: 1,
      5: 5
    })
    expect(result).toEqual({ col: 'something' })

    result = await db.run('INSERT INTO tbl(col) VALUES ($col)', {
      $col: 'other thing'
    })
    expect(result.lastID).toBe(2)

    result = await db.all(
      'SELECT col FROM tbl WHERE 13 = @thirteen ORDER BY col DESC',
      {
        '@thirteen': 13
      }
    )
    expect(result).toEqual([{ col: 'something' }, { col: 'other thing' }])

    const rowsCount = await db.each(
      'SELECT col FROM tbl WHERE ROWID = ?',
      [2],
      (err, result) => {
        if (err) {
          throw err
        }

        expect(result).toEqual({ col: 'other thing' })
      }
    )
    expect(rowsCount).toBe(1)

    result = await db.run('INSERT INTO tbl(col) VALUES (?)', ['other thing'])
    expect(result.lastID).toBe(3)

    await db.close()
  })

  it('should allow named parameters to be used with prepared statements', async () => {
    db = new Database({
      filename: ':memory:',
      driver: sqlite3.Database
    })

    await db.open()

    await db.exec('CREATE TABLE tbl (col TEXT)')
    let stmt = await db.prepare('INSERT INTO tbl(col) VALUES (:col)', {
      ':col': 'some text'
    })
    const rslt = await stmt.run()
    expect(rslt.lastID).toBe(1)
    await stmt.finalize()

    stmt = await db.prepare('SELECT col FROM tbl WHERE 1 = ? AND 5 = ?5')
    await stmt.bind({ 1: 1, 5: 5 })
    let result = await stmt.get()
    expect(result).toEqual({ col: 'some text' })
    await stmt.finalize()

    stmt = await db.prepare('INSERT INTO tbl(col) VALUES ($col)')
    result = await stmt.run({ $col: 'other text' })
    expect(result.lastID).toBe(2)
    await stmt.finalize()

    stmt = await db.prepare('SELECT col FROM tbl WHERE ROWID = ?')
    const rowsCount = await stmt.each(2, (err, result) => {
      if (err) {
        throw err
      }
      expect(result).toEqual({ col: 'other text' })
    })
    expect(rowsCount).toBe(1)
    await stmt.finalize()

    stmt = await db.prepare(
      'SELECT col FROM tbl WHERE 13 = @thirteen ORDER BY col DESC'
    )
    result = await stmt.all({ '@thirteen': 13 })
    expect(result).toEqual([{ col: 'some text' }, { col: 'other text' }])
    await stmt.finalize()

    await db.close()
  })

  it('should allow chaining Statement.run() calls', async () => {
    db = new Database({
      filename: ':memory:',
      driver: sqlite3.Database
    })

    await db.open()
    await db.exec('CREATE TABLE tbl (col1 TEXT, col2 TEXT, col3 TEXT)')

    const stmt = await db.prepare(
      'INSERT INTO tbl(col1, col2, col3) VALUES (?, ?, ?)'
    )

    let result = await stmt.run('a1', 'a2', 'a3')
    expect(result.lastID).toBe(1)

    result = await stmt.run('b1', 'b2', 'b3')
    expect(result.lastID).toBe(2)
    await stmt.finalize()

    result = await db.all('SELECT col1, col2, col3 FROM tbl')
    expect(result).toEqual([
      {
        col1: 'a1',
        col2: 'a2',
        col3: 'a3'
      },
      {
        col1: 'b1',
        col2: 'b2',
        col3: 'b3'
      }
    ])

    await db.close()
  })

  it('should handle BLOBs', async () => {
    db = new Database({
      filename: ':memory:',
      driver: sqlite3.Database
    })

    const buf = Buffer.from('SGVsbG8gd29ybGQh', 'base64')
    await db.open()
    await db.exec('CREATE TABLE dat (b BLOB)')

    const stmt = await db.run('INSERT INTO dat(b) VALUES(?)', buf)
    expect(stmt.lastID).toBe(1)

    const result = await db.get('SELECT b FROM dat')
    expect(result.b).toBeInstanceOf(Buffer)
    expect(result.b.toString('utf8')).toBe('Hello world!')

    await db.close()
  })

  it('should get the underlying database instance', async () => {
    db = new Database({
      filename: ':memory:',
      driver: sqlite3.Database
    })

    await db.open()
    expect(db.getDatabaseInstance()).toBeDefined()
  })

  it('should call configure', async () => {
    db = new Database({
      filename: ':memory:',
      driver: sqlite3.Database
    })

    await db.open()

    db.configure('busyTimeout', 1000)

    await db.close()
  })

  it('should migrate the database', async () => {
    db = new Database({
      filename: ':memory:',
      driver: sqlite3.Database
    })

    await db.open()
    const migrationsInstance = new Migrations(db)
    await migrationsInstance.migrate()

    const result = await db.all('SELECT id, name FROM migrations')
    expect(result).toEqual([
      { id: 1, name: 'initial' },
      { id: 2, name: 'some-feature' },
      { id: 3, name: 'test-cert' },
      { id: 4, name: 'no-down' }
    ])

    await db.close()
  })

  it('should work with sql-template-strings', async () => {
    db = new Database({
      filename: ':memory:',
      driver: sqlite3.Database
    })

    await db.open()
    const value1 = 'test'
    const value2 = 'foo'
    await db.exec('CREATE TABLE tbl (col TEXT)')
    await db.run(SQL`INSERT INTO tbl VALUES (${value1})`)

    let result = await db.get(SQL`SELECT col FROM tbl`)

    expect(result).toEqual({ col: value1 })

    result = await db.all(SQL`SELECT col FROM tbl`)

    expect(result).toEqual([{ col: value1 }])

    result = await db.all(SQL`SELECT * FROM tbl WHERE col = ${value1}`)

    expect(result.length).toBe(1)

    const stmt = await db.prepare(
      SQL`UPDATE tbl SET col = ${value2} WHERE col = ${value1}`
    )
    result = await stmt.run()

    expect(result.lastID).toBe(1)
    expect(result.changes).toBe(1)
    await stmt.finalize()

    await db.close()
  })

  it('should enable verbose mode', async () => {
    sqlite3.verbose()

    const db = await open({
      filename: ':memory:',
      driver: sqlite3.Database
    })

    await db.open()

    db.on('trace', async () => {
      expect(true).toBeTruthy()
      await db.close()
    })

    await db.exec('CREATE TABLE tbl (col1 TEXT, col2 TEXT, col3 TEXT)')
  })

  describe('typings', () => {
    it('should allow for a custom statement', async () => {
      db = new Database<sqlite3.Database, sqlite3.Statement>({
        filename: ':memory:',
        driver: sqlite3.Database
      })

      await db.open()

      await db.exec('CREATE TABLE tbl (col TEXT)')

      const result = await db.run(SQL`INSERT INTO tbl VALUES (1)`)

      expect(result.stmt).toBeDefined()

      const stmt = await db.prepare(SQL`UPDATE tbl SET col = 1 WHERE col = 2`)

      await stmt.run()
      await stmt.finalize()

      await db.close()
    })
  })
})
