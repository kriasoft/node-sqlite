## SQLite Client for Node.js Apps

[![NPM version](http://img.shields.io/npm/v/sqlite.svg?style=flat-square)](https://www.npmjs.com/package/sqlite)
[![NPM downloads](http://img.shields.io/npm/dm/sqlite.svg?style=flat-square)](https://www.npmjs.com/package/sqlite)
[![Build Status](http://img.shields.io/travis/kriasoft/node-sqlite/master.svg?style=flat-square)](https://travis-ci.org/kriasoft/node-sqlite)
[![Dependency Status](http://img.shields.io/david/kriasoft/node-sqlite.svg?style=flat-square)](https://david-dm.org/kriasoft/node-sqlite)
[![Online Chat](http://img.shields.io/badge/chat-%23node--sqlite_on_Gitter-blue.svg?style=flat-square)](https://gitter.im/kriasoft/node-sqlite)

> A wrapper library that adds ES6 promises and SQL-based migrations API to
> [sqlite3](https://github.com/mapbox/node-sqlite3/) ([docs](https://github.com/mapbox/node-sqlite3/wiki)).

---

<p align="center"><b>🔥 Want to strengthen your core JavaScript skills and master ES6?</b><br>I would personally recommend this awesome <a href="https://es6.io/friend/konstantin">ES6 course</a> by Wes Bos.</p>

---


### How to Install

```sh
$ npm install sqlite --save
```


### How to Use

**NOTE**: For Node.js v5 and below use `var db = require('sqlite/legacy');`.

This module has the same API as the original `sqlite3` library ([docs](https://github.com/mapbox/node-sqlite3/wiki/API)),
except that all its API methods return ES6 Promises and do not accept callback arguments.

Below is an example of how to use it with [Node.js](https://nodejs.org), [Express](http://expressjs.com/starter/hello-world.html) and [Babel](http://babeljs.io/):

```js
import express from 'express';
import Promise from 'bluebird';
import sqlite from 'sqlite';

const app = express();
const port = process.env.PORT || 3000;
const dbPromise = sqlite.open('./database.sqlite', { Promise });

app.get('/post/:id', async (req, res, next) => {
  try {
    const db = await dbPromise;
    const [post, categories] = await Promise.all([
      db.get('SELECT * FROM Post WHERE id = ?', req.params.id),
      db.all('SELECT * FROM Category');
    ]);
    res.render('post', { post, categories });
  } catch (err) {
    next(err);
  }
});

app.listen(port);
```

### Cached DB Driver

If you want to enable the [database object cache](https://github.com/mapbox/node-sqlite3/wiki/Caching)

```js
sqlite.open('./database.sqlite', { cached: true })
```

### Migrations

This module comes with a lightweight migrations API that works with [SQL-based migration files](https://github.com/kriasoft/node-sqlite/tree/master/migrations)
as the following example demonstrates:

##### `migrations/001-initial-schema.sql`

```sql
-- Up
CREATE TABLE Category (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE Post (id INTEGER PRIMARY KEY, categoryId INTEGER, title TEXT,
  CONSTRAINT Post_fk_categoryId FOREIGN KEY (categoryId)
    REFERENCES Category (id) ON UPDATE CASCADE ON DELETE CASCADE);
INSERT INTO Category (id, name) VALUES (1, 'Business');
INSERT INTO Category (id, name) VALUES (2, 'Technology');

-- Down
DROP TABLE Category
DROP TABLE Post;
```

##### `migrations/002-missing-index.sql`

```sql
-- Up
CREATE INDEX Post_ix_categoryId ON Post (categoryId);

-- Down
DROP INDEX Post_ix_categoryId;
```

##### `app.js` (Node.js/Express)

```js
import express from 'express';
import Promise from 'bluebird';
import sqlite from 'sqlite';

const app = express();
const port = process.env.PORT || 3000;

const dbPromise = Promise.resolve()
  .then(() => sqlite.open('./database.sqlite', { Promise }))
  .then(db => db.migrate({ force: 'last' }));

app.use(/* app routes */);

app.listen(port);
```

**NOTE**: For the development environment, while working on the database schema, you may want to set
`force: 'last'` (default `false`) that will force the migration API to rollback and re-apply the
latest migration over again each time when Node.js app launches.


### Multiple Connections

The `open` method resolves to the db instance which can be used in order to reference multiple open databases.

#### ES6

```js
import sqlite from 'sqlite';

Promise.all([
  sqlite.open('./main.sqlite', { Promise }),
  sqlite.open('./users.sqlite', { Promise })
]).then(function([mainDb, usersDb]){
  ...
});
```

#### ES7+ Async/Await

```js
import sqlite from 'sqlite';

async function main() {
  const [mainDb, usersDb] = await Promise.all([
    sqlite.open('./main.sqlite', { Promise }),
    sqlite.open('./users.sqlite', { Promise })
  ]);
  ...
}
main();
```

### References

* [Using SQLite with Node.js for Rapid Prototyping](https://medium.com/@tarkus/node-js-and-sqlite-for-rapid-prototyping-bc9cf1f26f10) on Medium.com
* [SQLite Documentation](https://www.sqlite.org/docs.html), e.g. [SQL Syntax](https://www.sqlite.org/lang.html), [Data Types](https://www.sqlite.org/datatype3.html) etc. on SQLite.org


### Related Projects

* [Node.js API Starter](https://github.com/kriasoft/nodejs-api-starter) — Data API server boilerplate (Node.js, PostgreSQL, Redis, Passport.js and GraphQL)
* [React Starter Kit](https://github.com/kriasoft/react-starter-kit) — Isomorphic web app boilerplate (Node.js/Express, React.js, GraphQL)
* [ASP.NET Core Starter Kit](https://github.com/kriasoft/react-starter-kit) — Single-page app boilerplate (ASP.NET Core, React.js, Web API)
* [Babel Starter Kit](https://github.com/kriasoft/babel-starter-kit) — JavaScript library boilerplate (ES2015, Babel, Rollup)
* [Membership Database](https://github.com/membership/membership.db) — SQL database boilerplate for web app users, roles and auth tokens


### Support

* Join [#node-sqlite](https://gitter.im/kriasoft/node-sqlite) chat room on Gitter to stay up to date regarding the project
* Join [#sqlite](https://webchat.freenode.net/?channels=sql,sqlite) IRC chat room on Freenode about general discussion about SQLite


### License

The MIT License © 2015-present Kriasoft. All rights reserved.

---
Made with ♥ by [Konstantin Tarkus](https://github.com/koistya) ([@koistya](https://twitter.com/koistya)), [Theo Gravity](https://github.com/theogravity) and [contributors](https://github.com/kriasoft/node-sqlite/graphs/contributors)
