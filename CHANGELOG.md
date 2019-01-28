## SQLite Client Change Log

All notable changes to this project will be documented in this file.

### [v3.0.1]
> 2019-01-28

- Typescript: Add cached option to open function [#81](https://github.com/kriasoft/node-sqlite/pull/81)
- Typescript: Merged declarations for methods that accepts both string and SQLStatements in Database [#80](https://github.com/kriasoft/node-sqlite/pull/80)
- Misc: Fix small typo [#84](https://github.com/kriasoft/node-sqlite/pull/84)
- Apply `npm audit` fixes (`mocha` updated to latest)

### [v3.0.0]
> 2018-08-22

- Add support for ES6 tagged template strings ([#66](https://github.com/kriasoft/node-sqlite/pull/66))

### [v2.9.3]
> 2018-08-22

- Change baseline `sqlite3` version from `4.0.0` -> `^4.0.0` ([#71](https://github.com/kriasoft/node-sqlite/pull/71))

### [v2.9.2]
> 2018-04-20

- Bump up baseline `sqlite3` version from `3.1.13` -> `4.0.0` ([#56](https://github.com/kriasoft/node-sqlite/pull/56))

### [v2.9.1]
> 2018-01-13

- Expose the `sqlite3#configure` method ([#53](https://github.com/kriasoft/node-sqlite/pull/53))
- Example fixes ([#52](https://github.com/kriasoft/node-sqlite/pull/52))
- Example fixes ([#49](https://github.com/kriasoft/node-sqlite/pull/49))
- Expose `sqlite3` debugging hooksk ([#48](https://github.com/kriasoft/node-sqlite/pull/48))
- Typescript updates ([#47](https://github.com/kriasoft/node-sqlite/pull/47))

### [v2.9.0]
> 2017-11-27

- Move away from global db object in readme ([#45](https://github.com/kriasoft/node-sqlite/pull/45))
- Fix typescript 2.6.1 issue where *.d.ts contains executable code when it is no longer allowed ([#47](https://github.com/kriasoft/node-sqlite/pull/47))
- Fix readme typo ([#46](https://github.com/kriasoft/node-sqlite/pull/49))
- Bump up baseline `sqlite3` version from `3.1.8` -> `3.1.13`

### [v2.8.0]
> 2017-05-21

- Match only “down” as separator in migration files ([#32](https://github.com/kriasoft/node-sqlite/pull/32))

### [v2.7.0]
> 2017-05-01

- Added support to use the [database object cache](https://github.com/mapbox/node-sqlite3/wiki/Caching) as an option (see readme)

### [v2.6.0]
> 2017-04-30

- Migration bug fixed where valid multiple dashes (eg a PEM string) was being removed ([#28](https://github.com/kriasoft/node-sqlite/pull/28))

### [v2.5.0]
> 2017-03-23

- npm publish'd from the wrong area. 2.4.0 is unpublished, 2.5.0 is the latest.

### [v2.4.0]
> 2017-03-23

- Typescript updates - Make ambient declarations more useful for type inference ([#26](https://github.com/kriasoft/node-sqlite/pull/26))

### [v2.3.0]
> 2017-01-31

- Fix a bug sorting of schemas during migrations ([#25](https://github.com/kriasoft/node-sqlite/pull/17))

### [v2.2.4]
> 2016-12-10

- Add TypeScript definition ([#21](https://github.com/kriasoft/node-sqlite/pull/21))

### [v2.2.3]
> 2016-11-10

- Update `sqlite3` package to 3.1.8
- Use `external-helpers` plugin in Babel config (ref [#12](https://github.com/kriasoft/node-sqlite/issues/12))

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

[unreleased]: https://github.com/kriasoft/node-sqlite/compare/v3.0.0...HEAD
[v3.0.0]: https://github.com/kriasoft/node-sqlite/compare/v2.9.3...v3.0.0
[v2.9.3]: https://github.com/kriasoft/node-sqlite/compare/v2.9.2...v2.9.3
[v2.9.2]: https://github.com/kriasoft/node-sqlite/compare/v2.9.1...v2.9.2
[v2.7.0]: https://github.com/kriasoft/node-sqlite/compare/v2.6.0...v2.7.0
[v2.6.0]: https://github.com/kriasoft/node-sqlite/compare/v2.5.0...v2.6.0
[v2.5.0]: https://github.com/kriasoft/node-sqlite/compare/v2.4.0...v2.5.0
[v2.4.0]: https://github.com/kriasoft/node-sqlite/compare/v2.3.0...v2.4.0
[v2.3.0]: https://github.com/kriasoft/node-sqlite/compare/v2.2.4...v2.3.0
[v2.2.4]: https://github.com/kriasoft/node-sqlite/compare/v2.2.3...v2.2.4
[v2.2.3]: https://github.com/kriasoft/node-sqlite/compare/v2.2.2...v2.2.3
[v2.2.2]: https://github.com/kriasoft/node-sqlite/compare/v2.2.1...v2.2.2
[v2.2.1]: https://github.com/kriasoft/node-sqlite/compare/v2.2.0...v2.2.1
[v2.2.0]: https://github.com/kriasoft/node-sqlite/compare/v2.0.2...v2.2.0
[v2.0.2]: https://github.com/kriasoft/node-sqlite/compare/v1.0.0...v2.0.2
[v1.0.0]: https://github.com/kriasoft/node-sqlite/compare/45c1f7904abca55510b45415fe75dccbfc3109a1...v1.0.0
