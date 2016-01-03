## SQLite client library for Node.js applications

[![NPM version](http://img.shields.io/npm/v/sqlite.svg?style=flat-square)](https://www.npmjs.com/package/sqlite)
[![NPM downloads](http://img.shields.io/npm/dm/sqlite.svg?style=flat-square)](https://www.npmjs.com/package/sqlite)
[![Build Status](http://img.shields.io/travis/kriasoft/node-sqlite/master.svg?style=flat-square)](https://travis-ci.org/kriasoft/node-sqlite)
[![Dependency Status](http://img.shields.io/david/kriasoft/node-sqlite.svg?style=flat-square)](https://david-dm.org/kriasoft/node-sqlite)
[![IRC Chat](http://img.shields.io/badge/IRC_Chat-%23sqlite_%40%20Freenode-blue.svg?style=flat-square)](https://webchat.freenode.net/?channels=sql,sqlite)

> This is just a wrapper library that adds ES6 promises to [sqlite3](https://github.com/mapbox/node-sqlite3/) ([docs](https://github.com/mapbox/node-sqlite3/wiki)).

### Prerequisites

* [Node.js](https://nodejs.org/) v5 or higher
* [Babel](http://babeljs.io/) JavaScript compiler (optional, but highly recommended)

### Usage Sample

```js
import express from 'express';
import Promise from 'bluebird';
import db from 'sqlite';

const server = express();
const port = process.env.PORT || 3000;

server.get('/', async (req, res, next) => {
  try {
    const row = await db.get(`SELECT * FROM tableName WHERE id = ?`, 123);
    res.send(`Hello, ${row.columnName}!`);
  } catch (err) {
    next(err);
  }
});

db.open('./db.sqlite', { verbose: true, Promise })
  .catch(err => console.error(err))
  .finally(() => {
    server.listen(port, () => {
      console.log(`Node.js app is running at http://localhost:${port}/`);
    });
  });
```

### Related Projects

  * [React Starter Kit](https://github.com/kriasoft/react-starter-kit) — Isomorphic web app boilerplate

### License

The MIT License © 2015 Kriasoft, LLC. All rights reserved.

---
Made with ♥ by Konstantin Tarkus ([@koistya](https://twitter.com/koistya))
