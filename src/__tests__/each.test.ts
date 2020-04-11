/* eslint-env jest */

import { Database } from '../Database'
import * as sqlite3 from 'sqlite3'

let db: Database

beforeEach(async () => {
  db = new Database({
    filename: ':memory:',
    driver: sqlite3.Database
  })

  await db.open()
  await db.exec('CREATE TABLE tbl (col TEXT)')

  await db.run('INSERT INTO tbl(col) VALUES (:col)', {
    ':col': 'something'
  })

  await db.run('INSERT INTO tbl(col) VALUES ($col)', {
    $col: 'other thing'
  })
})

describe('#each', () => {
  it('should throw if Database#each is used without a callback', async done => {
    try {
      await db.each('SELECT * FROM tbl WHERE col = ?', ['something'])
    } catch (e) {
      expect(e.message).toContain('must be a callback function')
      done()
    }
  })

  it('should throw if Database#each is used with two callbacks', async done => {
    try {
      await db.each(
        'SELECT * FROM tbl WHERE col = ?',
        ['something'],
        () => {},
        () => {}
      )
    } catch (e) {
      expect(e.message).toContain('should only have')
      done()
    }
  })

  it('should throw if Statement#each is used without a callback', async done => {
    try {
      const stmt = await db.prepare('SELECT col FROM tbl WHERE col = ?')
      await stmt.each('SELECT * FROM tbl WHERE col = ?', ['something'])
    } catch (e) {
      expect(e.message).toContain('must be a callback function')
      done()
    }
  })

  it('should throw if Statement#each is used with two callbacks', async done => {
    try {
      const stmt = await db.prepare('SELECT col FROM tbl WHERE col = ?')
      await stmt.each(
        'SELECT * FROM tbl WHERE col = ?',
        ['something'],
        () => {},
        () => {}
      )
    } catch (e) {
      expect(e.message).toContain('should only have')
      done()
    }
  })
})
