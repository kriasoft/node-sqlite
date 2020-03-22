# SQLite Client for Node.js Apps

[![NPM version](http://img.shields.io/npm/v/sqlite.svg?style=flat-square)](https://www.npmjs.com/package/sqlite)
[![Build Status](http://img.shields.io/travis/kriasoft/node-sqlite/master.svg?style=flat-square)](https://travis-ci.org/kriasoft/node-sqlite)
[![Online Chat](http://img.shields.io/badge/chat-%23node--sqlite_on_Gitter-blue.svg?style=flat-square)](https://gitter.im/kriasoft/node-sqlite)
![built with typescript](https://camo.githubusercontent.com/92e9f7b1209bab9e3e9cd8cdf62f072a624da461/68747470733a2f2f666c61742e62616467656e2e6e65742f62616467652f4275696c74253230576974682f547970655363726970742f626c7565) 
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> A wrapper library that adds ES6 promises and SQL-based migrations API to
> [sqlite3](https://github.com/mapbox/node-sqlite3/) ([docs](https://github.com/mapbox/node-sqlite3/wiki)).

**note** v4 of `sqlite` has breaking changes compared to v3! Please see `CHANGELOG.md` for more details.

<!-- TOC -->
- [Installation](#installation)
- [Usage](#usage)
  - [Opening the database](#opening-the-database)
    - [Without caching](#without-caching)
    - [With caching](#with-caching)
    - [With a custom driver](#with-a-custom-driver)
    - [`open` config params](#open-config-params)
  - [Examples](#examples)
    - [Creating a table and inserting data](#creating-a-table-and-inserting-data)
    - [Getting a single row](#getting-a-single-row)
    - [Getting many rows](#getting-many-rows)
    - [Inserting rows (part 2)](#inserting-rows-part-2)
    - [Updating rows](#updating-rows)
    - [Prepared statement](#prepared-statement)
    - [Get the driver instance](#get-the-driver-instance)
    - [Closing the database](#closing-the-database)
  - [ES6 tagged template strings](#es6-tagged-template-strings)
  - [Migrations](#migrations)
  - [API Documentation](#api-documentation)
- [References](#references)
- [Support](#support)
- [License](#license)

<!-- TOC END -->

## Installation

```sh
# v4 of sqlite is targted for nodejs 10 and on.
$ npm install sqlite@4.0.0-beta.4 --save

# If you need a legacy version for an older version of nodejs
# install v3 instead, and look at the v3 branch readme for usage details
$ npm install sqlite@3 --save
```

## Usage

This module has the same API as the original `sqlite3` library ([docs](https://github.com/mapbox/node-sqlite3/wiki/API)),
except that all its API methods return ES6 Promises and do not accept callback arguments (with the exception of `each()`).

### Opening the database

#### Without caching

```typescript
import { open } from 'sqlite'

// this is a top-level await
(async () => {
    // open the database
    const db = await open({
      filename: '/tmp/database.db'
    })
})()
```
or

```typescript
import { open } from 'sqlite'

open({
  filename: '/tmp/database.db'
}).then((db) => {
  // do your thing
})
```

#### With caching

If you want to enable the [database object cache](https://github.com/mapbox/node-sqlite3/wiki/Caching)

```typescript
import { open } from 'sqlite'

(async () => {
    const db = await open({
      filename: '/tmp/database.db',
      cache: true
    })
})()
```

#### With a custom driver

You can use an alternative library to `sqlite3` as long as it conforms to the `sqlite3` [API](https://github.com/mapbox/node-sqlite3/wiki/API).

For example, using `sqlite3-offline`:

```typescript
import { open } from 'sqlite'

(async () => {
    const db = await open({
      filename: '/tmp/database.db',
      cache: true
    })
})()
```

#### `open` config params

```typescript

// db is an instance of Sqlite3Database
// which is a wrapper around `sqlite3#Database`
const db = await open({
  /**
   * Valid values are filenames, ":memory:" for an anonymous in-memory
   * database and an empty string for an anonymous disk-based database.
   * Anonymous databases are not persisted and when closing the database
   * handle, their contents are lost.
   */
  filename: string

  /**
   * One or more of sqlite3.OPEN_READONLY, sqlite3.OPEN_READWRITE and
   * sqlite3.OPEN_CREATE. The default value is OPEN_READWRITE | OPEN_CREATE.
   */
  mode?: OpenDatabaseEnum

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
})
```

### Examples

- See the `src/**/__tests__` directory for more example usages
- See the `docs/` directory for full documentation.
- Also visit the `sqlite3` library [API docs](https://github.com/mapbox/node-sqlite3/wiki/API)

#### Creating a table and inserting data

```typescript
await db.exec('CREATE TABLE tbl (col TEXT)')
await db.exec('INSERT INTO tbl VALUES ("test")')
```

#### Getting a single row

```typescript
const result = await db.get('SELECT col FROM tbl WHERE col = ?', 'test')

// { col: 'test' }
```

```typescript
const result = await db.get('SELECT col FROM tbl WHERE col = ?', ['test'])

// { col: 'test' }
```

```typescript
const result = await db.get('SELECT col FROM tbl WHERE col = :test', {
  ':test': 'test'
})

// { col: 'test' }
```

#### Getting many rows

```typescript
const result = await db.all('SELECT col FROM tbl')

// [{ col: 'test' }]
```

#### Inserting rows (part 2)

```typescript
const result = await db.run(
  'INSERT INTO tbl (col) VALUES (?)',
  'foo'
)

/*
{
  // row ID of the inserted row
  lastId: 1,
  // instance of Sqlite3Statement
  // which is a wrapper around `sqlite3#Statement`
  stmt: <Sqlite3Statement>
}
*/
```

```typescript
const result = await db.run('INSERT INTO tbl(col) VALUES (:col)', {
  ':col': 'something'
})
```

#### Updating rows

```typescript
const result = await db.run(
  'UPDATE tbl SET col = ? WHERE col = ?',
  'foo',
  'test'
)

/*
{
  // number of rows changed
  changes: 1,
  // instance of Sqlite3Statement
  // which is a wrapper around `sqlite3#Statement`
  stmt: <Sqlite3Statement>
}
*/
```

#### Prepared statement

```typescript
// stmt is an instance of Sqlite3Statement
// which is a wrapper around `sqlite3#Statement`
const stmt = await db.prepare('SELECT col FROM tbl WHERE 1 = ? AND 5 = ?5')
await stmt.bind({ 1: 1, 5: 5 })
let result = await stmt.get()
// { col: 'some text' }
```

```typescript
const stmt = await db.prepare(
  'SELECT col FROM tbl WHERE 13 = @thirteen ORDER BY col DESC'
)

const result = await stmt.all({ '@thirteen': 13 })
```

#### Get the driver instance

Useful if you need to call methods that are not supported yet.

```typescript
const rawDb = db.getDatabaseInstance()
const rawStatement = stmt.getStatementInstance()
```

#### Closing the database

```typescript
await db.close()
```

### ES6 tagged template strings

This module is compatible with [sql-template-strings](https://www.npmjs.com/package/sql-template-strings).

```js
import SQL from 'sql-template-strings'

const book = 'harry potter';
const author = 'J. K. Rowling';

const data = await db.all(SQL`SELECT author FROM books WHERE name = ${book} AND author = ${author}`);
```

### Migrations

This module comes with a lightweight migrations API that works with [SQL-based migration files](https://github.com/kriasoft/node-sqlite/tree/master/migrations)

With default configuration, you can create a `migrations/` directory in your project with SQL files,
and call the `migrate()` method to run the SQL in the directory against the database.

See this project's `migrations/` folder for examples.

```typescript
await db.migrate({    
    /**
    * If true, will force the migration API to rollback and re-apply the latest migration over
    * again each time when Node.js app launches.
    */
    force?: boolean
    /**
    * Migrations table name. Default is 'migrations'
    */
    table?: string
    /**
    * Path to the migrations folder. Default is `path.join(process.cwd(), 'migrations')`
    */
    migrationsPath?: string
})
```

### API Documentation

See the `docs` directory for full documentation.

## References

* [Using SQLite with Node.js for Rapid Prototyping](https://medium.com/@tarkus/node-js-and-sqlite-for-rapid-prototyping-bc9cf1f26f10) on Medium.com
* [SQLite Documentation](https://www.sqlite.org/docs.html), e.g. [SQL Syntax](https://www.sqlite.org/lang.html), [Data Types](https://www.sqlite.org/datatype3.html) etc. on SQLite.org
* ES6 tagged [sql-template-strings](https://www.npmjs.com/package/sql-template-strings).

## Support

* Join [#node-sqlite](https://gitter.im/kriasoft/node-sqlite) chat room on Gitter to stay up to date regarding the project
* Join [#sqlite](https://webchat.freenode.net/?channels=sql,sqlite) IRC chat room on Freenode about general discussion about SQLite

## License

The MIT License © 2020-present Kriasoft / Theo Gravity. All rights reserved.

---
Made with ♥ by [Konstantin Tarkus](https://github.com/koistya) ([@koistya](https://twitter.com/koistya)), [Theo Gravity](https://github.com/theogravity) and [contributors](https://github.com/kriasoft/node-sqlite/graphs/contributors)
