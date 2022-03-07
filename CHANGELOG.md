## 4.0.25 - Mon Mar 07 2022 08:50:06

**Contributor:** Theo Gravity

- Update packages, fix tests for latest jest (#159)

* Update packages, fix tests for latest jest

* Update node version on ci

## 4.0.24 - Sun Mar 06 2022 20:12:24

**Contributor:** fresheneesz

- Updating exec to support passed in parameters like the other functions do. (#155)

## 4.0.23 - Mon May 24 2021 21:17:44

**Contributor:** dependabot[bot]

- Bump browserslist from 4.16.3 to 4.16.6 (#145)

Bumps [browserslist](https://github.com/browserslist/browserslist) from 4.16.3 to 4.16.6.
- [Release notes](https://github.com/browserslist/browserslist/releases)
- [Changelog](https://github.com/browserslist/browserslist/blob/main/CHANGELOG.md)
- [Commits](https://github.com/browserslist/browserslist/compare/4.16.3...4.16.6)

Signed-off-by: dependabot[bot] <support@github.com>

Co-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>

## 4.0.22 - Sun May 09 2021 19:59:28

**Contributor:** dependabot[bot]

- Bump handlebars from 4.7.6 to 4.7.7 (#141)

Bumps [handlebars](https://github.com/wycats/handlebars.js) from 4.7.6 to 4.7.7.
- [Release notes](https://github.com/wycats/handlebars.js/releases)
- [Changelog](https://github.com/handlebars-lang/handlebars.js/blob/master/release-notes.md)
- [Commits](https://github.com/wycats/handlebars.js/compare/v4.7.6...v4.7.7)

Signed-off-by: dependabot[bot] <support@github.com>

Co-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>

## 4.0.21 - Wed Mar 31 2021 21:22:42

**Contributor:** Theo Gravity

- Update packages to latest

## 4.0.20 - Wed Mar 31 2021 20:54:37

**Contributor:** dependabot[bot]

- Bump y18n from 4.0.0 to 4.0.1 (#139)

Bumps [y18n](https://github.com/yargs/y18n) from 4.0.0 to 4.0.1.
- [Release notes](https://github.com/yargs/y18n/releases)
- [Changelog](https://github.com/yargs/y18n/blob/master/CHANGELOG.md)
- [Commits](https://github.com/yargs/y18n/commits)

Signed-off-by: dependabot[bot] <support@github.com>

Co-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>

## 4.0.19 - Wed Dec 30 2020 02:11:07

**Contributor:** dependabot[bot]

- Bump ini from 1.3.5 to 1.3.8 (#135)

Bumps [ini](https://github.com/isaacs/ini) from 1.3.5 to 1.3.8.
- [Release notes](https://github.com/isaacs/ini/releases)
- [Commits](https://github.com/isaacs/ini/compare/v1.3.5...v1.3.8)

Signed-off-by: dependabot[bot] <support@github.com>

Co-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>

## 4.0.18 - Fri Dec 04 2020 21:20:15

**Contributor:** dependabot[bot]

- Bump highlight.js from 10.1.2 to 10.4.1 (#133)

Bumps [highlight.js](https://github.com/highlightjs/highlight.js) from 10.1.2 to 10.4.1.
- [Release notes](https://github.com/highlightjs/highlight.js/releases)
- [Changelog](https://github.com/highlightjs/highlight.js/blob/master/CHANGES.md)
- [Commits](https://github.com/highlightjs/highlight.js/compare/10.1.2...10.4.1)

Signed-off-by: dependabot[bot] <support@github.com>

Co-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>

## 4.0.17 - Fri Nov 13 2020 19:18:04

**Contributor:** Tiger Oakes

- Add strict types for each() (#131)

## 4.0.16 - Fri Nov 13 2020 19:15:24

**Contributor:** Tiger Oakes

- Let migrations be read manually (#132)

## 4.0.15 - Wed Sep 30 2020 16:06:20

**Contributor:** Paul Kiddle

- Make down migrations optional (#129)

## 4.0.14 - Mon Aug 10 2020 01:08:29

**Contributor:** Theo Gravity

- Revert filename optional; update filename checks instead (#125)

The `filename` property is back to being required, but empty strings are valid values for the purpose of using an anonymous disk-based database.

Values of `undefined` or `null` for `filename` will throw.

## 4.0.13 - Mon Aug 10 2020 00:57:58

**Contributor:** Theo Gravity

- Make filename optional (#124)

This allows for the specification of an anonymous database.

## 4.0.12 - Mon Jul 20 2020 04:19:01

**Contributor:** dependabot[bot]

- Bump lodash from 4.17.15 to 4.17.19 (#122)

Bumps [lodash](https://github.com/lodash/lodash) from 4.17.15 to 4.17.19.
- [Release notes](https://github.com/lodash/lodash/releases)
- [Commits](https://github.com/lodash/lodash/compare/4.17.15...4.17.19)

Signed-off-by: dependabot[bot] <support@github.com>

Co-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>

## 4.0.11 - Fri Jun 12 2020 09:43:39

**Contributor:** Theo Gravity

- Update readme for inserting rows (#120)

@akc42 pointed out that the docs for `db.run` says it returns `lastId` when it should be `lastID`.

## 4.0.10 - Wed Jun 03 2020 00:51:41

**Contributor:** Gustavo Rodrigues

- Use HTTPS in README badges (#118)

Shields.io badges were being loaded using HTTP causing mixed-content errors in the NPM page.

## 4.0.9 - Mon May 25 2020 22:50:02

**Contributor:** Markus Felten

- feat: provide native esm exports (#117)

## 4.0.8 - Thu May 21 2020 22:59:57

**Contributor:** George Corney

- Move triple-slash reference so it is recognized (#115)

## 4.0.7 - Sun Apr 12 2020 19:43:31

**Contributor:** Yamavol

- Fix typescript defs for sqlite3 loadExtension() (#112)

## 4.0.6 - Sat Apr 11 2020 04:16:08

**Contributor:** Theo Gravity

- Throw an error if two callbacks are defined for #each()

This addresses an issue where the `sqlite3` API for `each()` uses
two callbacks, while this library only uses one for `each()`.

An error is now thrown if two callbacks are defined when using the
`sqlite` `each()` method.

(In `sqlite`, the second callback of `sqlite3` is used to resolve the
promise.)

## 4.0.5 - Sun Apr 05 2020 20:13:43

**Contributor:** [jameswilddev](https://github.com/jameswilddev)

- Use non-default imports rather than synthetic default imports. (#110)

## 4.0.4 - Sun Apr 05 2020 07:44:39

- Fix Typescript reference issues for sqlite3 if it is not installed (#109)

This allows the usage of the `sqlite3-offline`; library in Typescript.

## 4.0.3 - Sun Apr 05 2020 00:01:31

- Fix Typescript issue where `sql-template-strings` is a forced requirement (#108)

It should be an optional dependency and is not required for installation.

## 4.0.2 - Sat Apr 04 2020 22:19:38

- Add management tools section to readme

## 4.0.1 - Sat Apr 04 2020 21:46:39

New major version 4!

This version has been written in Typescript with a target of node.js v10 or greater.

If you are using an older version of node < 10, use the 3.x version of the library instead.

What's new:

- ZERO dependencies!
  * This should make troubleshooting the library vs the `sqlite3` driver easier. Most issues relate
  to the `sqlite3` driver vs the library.
  * Allows support for alternative drivers such as `sqlite3-offline` as long as they match the `node-sqlite3`
  API.
- Re-written in Typescript.
- All existing features maintained.
- Existing unit tests were cleaned up and pass, new tests added.
- Better documentation. See `README.md`.
- New CI process - pull requests merged into master will run tests, build, and auto-publish to NPM.
- Parity with the `node-sqlite3` API.
  * Exceptions are `serialize` and `parallelize` (PRs are welcomed!)

Breaking Changes:

- `sqlite3` is no longer a dependency of this project. You must install it first 
before using this wrapper library.
  * This allows for usage of alternative libraries.
  * This means `verbose` and `cache` modes must be enabled before using the library.
  * The `README.md` file explains how to do this.
- Opening a new database has changed. See `README.md` for example.
- migrations API: `force` is now a `boolean`.
- Can no longer specify a custom `Promise` library. Uses native `Promise` instead.


###### [v3.0.3]
> 2019-03-22

- Export class types for flow [##88](https://github.com/kriasoft/node-sqlite/pull/88)

###### [v3.0.2]
> 2019-02-14

- Flow: Add Flow typings [##86](https://github.com/kriasoft/node-sqlite/pull/86)

###### [v3.0.1]
> 2019-01-28

- Typescript: Add cached option to open function [##81](https://github.com/kriasoft/node-sqlite/pull/81)
- Typescript: Merged declarations for methods that accepts both string and SQLStatements in Database [##80](https://github.com/kriasoft/node-sqlite/pull/80)
- Misc: Fix small typo [##84](https://github.com/kriasoft/node-sqlite/pull/84)
- Apply `npm audit` fixes (`mocha` updated to latest)

###### [v3.0.0]
> 2018-08-22

- Add support for ES6 tagged template strings ([##66](https://github.com/kriasoft/node-sqlite/pull/66))

###### [v2.9.3]
> 2018-08-22

- Change baseline `sqlite3` version from `4.0.0` -> `^4.0.0` ([##71](https://github.com/kriasoft/node-sqlite/pull/71))

###### [v2.9.2]
> 2018-04-20

- Bump up baseline `sqlite3` version from `3.1.13` -> `4.0.0` ([##56](https://github.com/kriasoft/node-sqlite/pull/56))

###### [v2.9.1]
> 2018-01-13

- Expose the `sqlite3##configure` method ([##53](https://github.com/kriasoft/node-sqlite/pull/53))
- Example fixes ([##52](https://github.com/kriasoft/node-sqlite/pull/52))
- Example fixes ([##49](https://github.com/kriasoft/node-sqlite/pull/49))
- Expose `sqlite3` debugging hooksk ([##48](https://github.com/kriasoft/node-sqlite/pull/48))
- Typescript updates ([##47](https://github.com/kriasoft/node-sqlite/pull/47))

###### [v2.9.0]
> 2017-11-27

- Move away from global db object in readme ([##45](https://github.com/kriasoft/node-sqlite/pull/45))
- Fix typescript 2.6.1 issue where *.d.ts contains executable code when it is no longer allowed ([##47](https://github.com/kriasoft/node-sqlite/pull/47))
- Fix readme typo ([##46](https://github.com/kriasoft/node-sqlite/pull/49))
- Bump up baseline `sqlite3` version from `3.1.8` -> `3.1.13`

###### [v2.8.0]
> 2017-05-21

- Match only “down” as separator in migration files ([##32](https://github.com/kriasoft/node-sqlite/pull/32))

###### [v2.7.0]
> 2017-05-01

- Added support to use the [database object cache](https://github.com/mapbox/node-sqlite3/wiki/Caching) as an option (see readme)

###### [v2.6.0]
> 2017-04-30

- Migration bug fixed where valid multiple dashes (eg a PEM string) was being removed ([##28](https://github.com/kriasoft/node-sqlite/pull/28))

###### [v2.5.0]
> 2017-03-23

- npm publish'd from the wrong area. 2.4.0 is unpublished, 2.5.0 is the latest.

###### [v2.4.0]
> 2017-03-23

- Typescript updates - Make ambient declarations more useful for type inference ([##26](https://github.com/kriasoft/node-sqlite/pull/26))

###### [v2.3.0]
> 2017-01-31

- Fix a bug sorting of schemas during migrations ([##25](https://github.com/kriasoft/node-sqlite/pull/17))

###### [v2.2.4]
> 2016-12-10

- Add TypeScript definition ([##21](https://github.com/kriasoft/node-sqlite/pull/21))

###### [v2.2.3]
> 2016-11-10

- Update `sqlite3` package to 3.1.8
- Use `external-helpers` plugin in Babel config (ref [##12](https://github.com/kriasoft/node-sqlite/issues/12))

###### [v2.2.2]
> 2016-11-02

- Fix duplicate migration application when db.migrate() is run multiple times ([##19](https://github.com/kriasoft/node-sqlite/pull/9))

###### [v2.2.1]
> 2016-10-26

- Update `sqlite3` package to 3.1.7 ([##17](https://github.com/kriasoft/node-sqlite/pull/17), [changelog](https://github.com/mapbox/node-sqlite3/blob/master/CHANGELOG.md))

###### [v2.2.0]
> 2016-07-22

- Add named parameters support (https://github.com/kriasoft/node-sqlite/pull/10)
- `Statement` now has `sql()`, `lastId()`, `changes()`

###### [v2.0.2]
> 2016-05-21

- Add SQL-based migrations API: `db.migrate({ force: 'last' })`
- Add migration files examples. See `/migrations` folder.
- Add support for multiple databases: `const db = sqlite.open('db.sqlite')`
- Add async wrapper for `sqlite3` Statement object

###### [v1.0.0]
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
