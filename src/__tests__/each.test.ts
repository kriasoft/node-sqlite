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
  it('should throw if Database#each is used without a callback', async () => {
    const fn = async () => {
      await db.each('SELECT * FROM tbl WHERE col = ?', ['something'])
    }
    await expect(fn).rejects.toThrow('must be a callback function')
  })

  it('should throw if Database#each is used with two callbacks', async () => {
    const fn = async () => {
      await db.each(
        'SELECT * FROM tbl WHERE col = ?',
        ['something'],
        () => {},
        () => {}
      )
    }

    await expect(fn).rejects.toThrow('should only have')
  })

  it('should throw if Statement#each is used without a callback', async () => {
    const fn = async () => {
      const stmt = await db.prepare('SELECT col FROM tbl WHERE col = ?')
      await stmt.each('SELECT * FROM tbl WHERE col = ?', ['something'])
    }

    await expect(fn).rejects.toThrow('must be a callback function')
  })

  it('should throw if Statement#each is used with two callbacks', async () => {
    const fn = async () => {
      const stmt = await db.prepare('SELECT col FROM tbl WHERE col = ?')
      await stmt.each(
        'SELECT * FROM tbl WHERE col = ?',
        ['something'],
        () => {},
        () => {}
      )
    }

    await expect(fn).rejects.toThrow('should only have')
  })
})
