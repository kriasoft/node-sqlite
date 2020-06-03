# SQLite Client for Node.js Apps

[![NPM version](https://img.shields.io/npm/v/sqlite.svg?style=flat-square)](https://www.npmjs.com/package/sqlite)
[![CircleCI](https://circleci.com/gh/kriasoft/node-sqlite.svg?style=svg)](https://circleci.com/gh/kriasoft/node-sqlite) 
[![Online Chat](https://img.shields.io/badge/chat-%23node--sqlite_on_Gitter-blue.svg?style=flat-square)](https://gitter.im/kriasoft/node-sqlite)
![built with typescript](https://camo.githubusercontent.com/92e9f7b1209bab9e3e9cd8cdf62f072a624da461/68747470733a2f2f666c61742e62616467656e2e6e65742f62616467652f4275696c74253230576974682f547970655363726970742f626c7565) 
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> A wrapper library written in Typescript with **ZERO** dependencies that adds ES6 promises 
> and SQL-based migrations API to [sqlite3](https://github.com/mapbox/node-sqlite3/) ([docs](https://github.com/mapbox/node-sqlite3/wiki)).

**note** v4 of `sqlite` has breaking changes compared to v3! Please see `CHANGELOG.md` for more details.

<!-- TOC -->
- [Installation](#installation)
  - [Install `sqlite3`](#install-sqlite3)
  - [Install `sqlite`](#install-sqlite)
- [Usage](#usage)
  - [Opening the database](#opening-the-database)
    - [Without caching](#without-caching)
    - [With caching](#with-caching)
    - [Enable verbose / debug mode](#enable-verbose--debug-mode)
    - [Tracing SQL errors](#tracing-sql-errors)
    - [With a custom driver](#with-a-custom-driver)
    - [Opening multiple databases](#opening-multiple-databases)
    - [`open` config params](#open-config-params)
  - [Examples](#examples)
    - [Creating a table and inserting data](#creating-a-table-and-inserting-data)
    - [Getting a single row](#getting-a-single-row)
    - [Getting many rows](#getting-many-rows)
    - [Inserting rows (part 2)](#inserting-rows-part-2)
    - [Updating rows](#updating-rows)
    - [Prepared statement](#prepared-statement)
    - [`each()`](#each)
    - [Get the driver instance](#get-the-driver-instance)
    - [Closing the database](#closing-the-database)
  - [ES6 tagged template strings](#es6-tagged-template-strings)
  - [Migrations](#migrations)
- [Typescript tricks](#typescript-tricks)
  - [Import interfaces from sqlite](#import-interfaces-from-sqlite)
  - [Specify typings for a specific database driver](#specify-typings-for-a-specific-database-driver)
  - [Use generics to get better typings on your rows](#use-generics-to-get-better-typings-on-your-rows)
    - [Get example](#get-example)
    - [All example](#all-example)
- [API Documentation](#api-documentation)
- [Management Tools](#management-tools)
- [Alternative SQLite libraries](#alternative-sqlite-libraries)
- [References](#references)
- [Support](#support)
- [License](#license)

<!-- TOC END -->

## Installation

### Install `sqlite3`

Most people who use this library will use [sqlite3](https://github.com/mapbox/node-sqlite3/) 
as the database driver. 

Any library that conforms to the `sqlite3` ([API](https://github.com/mapbox/node-sqlite3/wiki/API)) 
should also work.

`$ npm install sqlite3 --save`

### Install `sqlite`

```sh
# v4 of sqlite is targeted for nodejs 10 and on.
$ npm install sqlite --save

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
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// this is a top-level await 
(async () => {
    // open the database
    const db = await open({
      filename: '/tmp/database.db',
      driver: sqlite3.Database
    })
})()
```
or

```typescript
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

open({
  filename: '/tmp/database.db',
  driver: sqlite3.Database
}).then((db) => {
  // do your thing
})
```

or

```typescript
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// you would have to import / invoke this in another file
export async function openDb () {
  return open({
    filename: '/tmp/database.db',
    driver: sqlite3.Database
  })
}
```

#### With caching

If you want to enable the [database object cache](https://github.com/mapbox/node-sqlite3/wiki/Caching)

```typescript
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

(async () => {
    const db = await open({
      filename: '/tmp/database.db',
      driver: sqlite3.cached.Database
    })
})()
```

#### Enable verbose / debug mode

```typescript
import sqlite3 from 'sqlite3'

sqlite3.verbose()
```

#### Tracing SQL errors

For more info, see this [doc](https://github.com/mapbox/node-sqlite3/wiki/Debugging#databaseontrace-callback).

```typescript
db.on('trace', (data) => {
  
})
```

#### With a custom driver

You can use an alternative library to `sqlite3` as long as it conforms to the `sqlite3` [API](https://github.com/mapbox/node-sqlite3/wiki/API).

For example, using `sqlite3-offline`:

```typescript
import sqlite3Offline from 'sqlite3-offline'
import { open } from 'sqlite'

(async () => {
    const db = await open({
      filename: '/tmp/database.db',
      driver: sqlite3Offline.Database
    })
})()
```

#### Opening multiple databases

```typescript
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

(async () => {
  const [db1, db2] = await Promise.all([
    open({
      filename: '/tmp/database.db',
      driver: sqlite3.Database
    }),
    open({
      filename: '/tmp/database2.db',
      driver: sqlite3.Database
    }),
  ])

  await db1.migrate({
    migrationsPath: '...'
  })

  await db2.migrate({
    migrationsPath: '...'
  })
})()
```

#### `open` config params

```typescript

// db is an instance of `sqlite#Database`
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
  mode?: number

  /**
   * The database driver. Most will install `sqlite3` and use the `Database` class from it.
   * As long as the library you are using conforms to the `sqlite3` API, you can use it as
   * the driver.
   *
   * @example
   *
   * ```
   * import sqlite from 'sqlite3'
   *
   * const driver = sqlite.Database
   * ```
   */
  driver: any
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
  // instance of `sqlite#Statement`
  // which is a wrapper around `sqlite3#Statement`
  stmt: <Statement>
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
  // instance of `sqlite#Statement`
  // which is a wrapper around `sqlite3#Statement`
  stmt: <Statement>
}
*/
```

#### Prepared statement

```typescript
// stmt is an instance of `sqlite#Statement`
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

#### `each()`

`each()` is a bit different compared to the other operations.

The function signature looks like this:

`async each (sql, [...params], callback)`

- `callback(err, row)` is triggered when the database has a row to return
- The promise resolves when all rows have returned with the number or rows returned.

```typescript
const rowsCount = await db.each(
  'SELECT col FROM tbl WHERE ROWID = ?',
  [2],
  (err, row) => {
    if (err) {
      throw err
    }

    // row = { col: 'other thing' }
  }
)

// rowsCount = 1
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

## Typescript tricks

### Import interfaces from sqlite

`import { ISqlite, IMigrate } from 'sqlite'`

See the definitions for more details.

### Specify typings for a specific database driver

```typescript
// Assuming you have @types/sqlite3 installed
import sqlite3 from 'sqlite3'

// sqlite3.Database, sqlite3.Statement is the default if no explicit generic is specified
await open<sqlite3.Database, sqlite3.Statement>({
  filename: ':memory'
})
```

### Use generics to get better typings on your rows

Most methods allow for the use of [generics](https://www.typescriptlang.org/docs/handbook/generics.html)
to specify the data type of your returned data. This allows your IDE to perform better autocomplete
and the typescript compiler to perform better static type analysis.

#### Get example

```typescript

interface Row {
  col: string
}

// result will be of type Row, allowing Typescript supported IDEs to autocomplete on the properties!
const result = await db.get<Row>('SELECT col FROM tbl WHERE col = ?', 'test')
```

#### All example

```typescript
interface Row {
  col: string
}

// Result is an array of rows, you can now have array-autocompletion data
const result = await db.all<Row[]>('SELECT col FROM tbl')

result.each((row) => {
  // row should have type information now!
})
```

## API Documentation

See the [`docs`](docs/globals.md) directory for full documentation.

## Management Tools

- [Beekeeper Studio](https://www.beekeeperstudio.io/): Open Source SQL Editor and Database Manager
- [DB Browser for SQLite](https://github.com/sqlitebrowser/sqlitebrowser): Desktop-based browser.
- [datasette](https://github.com/simonw/datasette): Datasette is a tool for exploring and publishing 
data. Starts up a server that provides a web interface to your SQLite data.
- [SQLite Studio](https://github.com/pawelsalawa/sqlitestudio): A free, open source, multi-platform SQLite database manager written in C++, with use of Qt framework.
- [HeidiSQL](https://www.heidisql.com/): Full-featured database editor.
- [DBeaver](https://dbeaver.io/): Full-featured multi-platform database tool and designer.   

## Alternative SQLite libraries

This library and the library it primarily supports, `sqlite3`, may not be the best library that
fits your use-case. You might want to try these other SQLite libraries:

- [better-sqlite3](https://github.com/JoshuaWise/better-sqlite3): Totes itself as the fastest and 
simplest library for SQLite3 in Node.js.
- [sql.js](https://github.com/sql-js/sql.js): SQLite compiled to Webassembly.
- [sqlite3-offline](https://github.com/DenisCarriere/sqlite3-offline): Offers pre-compiled `sqlite3` 
binaries if your machine cannot compile it. Should be mostly compatible with this library.

If you know of any others, feel free to open a PR to add them to the list.

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
