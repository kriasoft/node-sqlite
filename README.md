## SQLite Client for Node.js Apps

[![NPM version](http://img.shields.io/npm/v/sqlite.svg?style=flat-square)](https://www.npmjs.com/package/sqlite)
[![NPM downloads](http://img.shields.io/npm/dm/sqlite.svg?style=flat-square)](https://www.npmjs.com/package/sqlite)
[![Build Status](http://img.shields.io/travis/kriasoft/node-sqlite/master.svg?style=flat-square)](https://travis-ci.org/kriasoft/node-sqlite)
[![Dependency Status](http://img.shields.io/david/kriasoft/node-sqlite.svg?style=flat-square)](https://david-dm.org/kriasoft/node-sqlite)
[![Online Chat](http://img.shields.io/badge/chat-%23node--sqlite_on_Gitter-blue.svg?style=flat-square)](https://gitter.im/kriasoft/node-sqlite)

> A wrapper library that adds ES6 promises and SQL-based migrations API to
> [sqlite3](https://github.com/mapbox/node-sqlite3/) ([docs](https://github.com/mapbox/node-sqlite3/wiki)).


### How to Install

```sh
$ npm install sqlite --save
```


### How to Use

This module has the same API as the original `sqlite3` library ([docs](https://github.com/mapbox/node-sqlite3/wiki/API))
except that all its API methods return promises and do not accept callback arguments.

Below is an example of how to use it with Node.js/Express and [Babel](http://babeljs.io/):

```js
import express from 'express';
import Promise from 'bluebird';
import db from 'sqlite';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', async (req, res, next) => {
  try {
    const row = await db.get(`SELECT * FROM tableName WHERE id = ?`, 123);
    res.send(`Hello, ${row.columnName}!`);
  } catch (err) {
    next(err);
  }
});

// Connect to the database before launching Node.js app
(async () => {
  try {
    await db.open('./database.sqlite', { Promise });
  } finally {
    app.listen(port);
  }
})();
```

**NOTE**: For Node.js v5 and below use `var db = require('sqlite/legacy');`.


### Migrations

This module comes with a lightweight migrations API that works with [SQL-based migration files](https://github.com/kriasoft/node-sqlite/tree/master/migrations)
as the following example demonstrates:

##### `migrations/001-initial.sql`

```sql
-- Up
CREATE TABLE User (id INTEGER PRIMARY KEY, email TEXT);
INSERT INTO User (id, email) VALUES (1, 'user@example.com');

-- Down
DROP TABLE User;
```

##### `migrations/002-post.sql`

```sql
-- Up
CREATE TABLE Post (id INTEGER PRIMARY KEY, userId INTEGER, title TEXT, body TEXT);

-- Down
DROP TABLE Post;
```

##### `app.js` (Node.js/Express)

```js
import express from 'express';
import Promise from 'bluebird';
import db from 'sqlite';

const app = express();
const port = process.env.PORT || 3000;

app.use(/* app routes */);

(async () => {
  try {
    // Try connect to the database and update its schema to the latest version
    await db.open('./db.sqlite', { Promise });
    await db.migrate();
  } finally {
    // Launch Node.js/Express app
    app.listen(port);
  }
})();
```

**NOTE**: For the development environment, while working on the database schema, you may want to set
`force: 'last'` (default `false`) that will force the migration API to rollback and re-apply the
latest migration over again each time when Node.js app launches. 


### Related Projects

* [React Starter Kit](https://github.com/kriasoft/react-starter-kit) — Isomorphic web app boilerplate (Node.js/Express, React.js, GraphQL)
* [Babel Starter Kit](https://github.com/kriasoft/babel-starter-kit) — JavaScript library boilerplate (ES2015, Babel, Rollup)
* [Membership Database](https://github.com/membership/membership.db) — SQL database boilerplate for web app users, roles and auth tokens


### Support

* Join [#node-sqlite](https://gitter.im/kriasoft/node-sqlite) chat room on Gitter to stay up to date regarding the project
* Join [#sqlite](https://webchat.freenode.net/?channels=sql,sqlite) IRC chat room on Freenode about general discussion about SQLite


### License

The MIT License © 2015-2016 Kriasoft, LLC. All rights reserved.

---
Made with ♥ by Konstantin Tarkus ([@koistya](https://twitter.com/koistya)) and [contributors](https://github.com/kriasoft/node-sqlite/graphs/contributors)
