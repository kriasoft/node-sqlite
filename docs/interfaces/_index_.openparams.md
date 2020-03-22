[sqlite](../README.md) › [Globals](../globals.md) › ["index"](../modules/_index_.md) › [OpenParams](_index_.openparams.md)

# Interface: OpenParams

## Hierarchy

* [Config](../modules/_interfaces_sqlite3_interfaces_.md#config)

  ↳ **OpenParams**

## Index

### Properties

* [cached](_index_.openparams.md#optional-cached)
* [driver](_index_.openparams.md#optional-driver)
* [filename](_index_.openparams.md#filename)
* [mode](_index_.openparams.md#optional-mode)

## Properties

### `Optional` cached

• **cached**? : *boolean*

*Defined in [index.ts:24](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/index.ts#L24)*

If true, uses the node-sqlite3 built-in database object cache to avoid opening the same
database multiple times.

Does not apply if `driver` is defined.

**`see`** https://github.com/mapbox/node-sqlite3/wiki/Caching

___

### `Optional` driver

• **driver**? : *any*

*Defined in [index.ts:14](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/index.ts#L14)*

Use an alternative library instead of sqlite3. The interface of the library must
conform to sqlite3.

**`see`** https://github.com/mapbox/node-sqlite3/wiki/API

___

###  filename

• **filename**: *string*

*Inherited from [Config](../modules/_interfaces_sqlite3_interfaces_.md#config).[filename](../modules/_interfaces_sqlite3_interfaces_.md#filename)*

*Defined in [interfaces/Sqlite.interfaces.ts:21](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/interfaces/Sqlite3.interfaces.ts#L21)*

Valid values are filenames, ":memory:" for an anonymous in-memory
database and an empty string for an anonymous disk-based database.
Anonymous databases are not persisted and when closing the database
handle, their contents are lost.

___

### `Optional` mode

• **mode**? : *[OpenDatabaseEnum](../modules/_interfaces_sqlite3_interfaces_.md#opendatabaseenum)*

*Inherited from [Config](../modules/_interfaces_sqlite3_interfaces_.md#config).[mode](../modules/_interfaces_sqlite3_interfaces_.md#optional-mode)*

*Defined in [interfaces/Sqlite.interfaces.ts:27](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/interfaces/Sqlite3.interfaces.ts#L27)*

One or more of sqlite3.OPEN_READONLY, sqlite3.OPEN_READWRITE and
sqlite3.OPEN_CREATE. The default value is OPEN_READWRITE | OPEN_CREATE.
