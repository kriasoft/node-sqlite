## SQLite Client Change Log

All notable changes to this project will be documented in this file.

### [Unreleased][unreleased]

- ...

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

[unreleased]: https://github.com/kriasoft/node-sqlite/compare/v2.0.2...HEAD
[v2.0.1]: https://github.com/kriasoft/node-sqlite/compare/v1.0.0...v2.0.2
[v1.0.0]: https://github.com/kriasoft/node-sqlite/compare/45c1f7904abca55510b45415fe75dccbfc3109a1...v1.0.0
