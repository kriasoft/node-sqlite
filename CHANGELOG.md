## SQLite Client Change Log

All notable changes to this project will be documented in this file.

### [v2.2.2]
> 2016-11-02

- Fix duplicate migration application when db.migrate() is run multiple times ([#19](https://github.com/kriasoft/node-sqlite/pull/9))

### [v2.2.1]
> 2016-10-26

- Update `sqlite3` package to 3.1.7 ([#17](https://github.com/kriasoft/node-sqlite/pull/17), [changelog](https://github.com/mapbox/node-sqlite3/blob/master/CHANGELOG.md))

### [v2.2.0]
> 2016-07-22

- Add named parameters support (https://github.com/kriasoft/node-sqlite/pull/10)
- `Statement` now has `sql()`, `lastId()`, `changes()`

### [v2.0.2]
> 2016-05-21

- Add SQL-based migrations API: `db.migrate({ force: 'last' })`
- Add migration files examples. See `/migrations` folder.
- Add support for multiple databases: `const db = sqlite.open('db.sqlite')`
- Add async wrapper for `sqlite3` Statement object

### [v1.0.0]
> 2016-05-19

- The initial release after a couple of preview versions earlier this year
- Built the project with Babel and Rollup for Node.js v3-5, Node.js v6, Node.js vNext
  (Harmony Modules)

[unreleased]: https://github.com/kriasoft/node-sqlite/compare/v2.2.1...HEAD
[v2.2.1]: https://github.com/kriasoft/node-sqlite/compare/v2.2.0...v2.2.1
[v2.2.0]: https://github.com/kriasoft/node-sqlite/compare/v2.0.2...v2.2.0
[v2.0.2]: https://github.com/kriasoft/node-sqlite/compare/v1.0.0...v2.0.2
[v1.0.0]: https://github.com/kriasoft/node-sqlite/compare/45c1f7904abca55510b45415fe75dccbfc3109a1...v1.0.0
