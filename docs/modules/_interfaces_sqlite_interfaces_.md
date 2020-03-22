[sqlite](../README.md) › [Globals](../globals.md) › ["interfaces/Sqlite.interfaces"](_interfaces_sqlite_interfaces_.md)

# Module: "interfaces/Sqlite.interfaces"

## Index

### Namespaces

* [ISqlite](_interfaces_sqlite_interfaces_.md#isqlite)

### Interfaces

* [SqlObj](../interfaces/_interfaces_sqlite_interfaces_.sqlobj.md)

## Namespaces

###  ISqlite

• **ISqlite**:

*Defined in [interfaces/Sqlite.interfaces.ts:9](https://github.com/kriasoft/node-sqlite/blob/16a8dec/src/interfaces/Sqlite.interfaces.ts#L9)*

###  Config

• **Config**:

*Defined in [interfaces/Sqlite.interfaces.ts:16](https://github.com/kriasoft/node-sqlite/blob/16a8dec/src/interfaces/Sqlite.interfaces.ts#L16)*

###  driver

• **driver**: *any*

*Defined in [interfaces/Sqlite.interfaces.ts:44](https://github.com/kriasoft/node-sqlite/blob/16a8dec/src/interfaces/Sqlite.interfaces.ts#L44)*

The database driver. Most will install `sqlite3` and use the `Database` class from it.
As long as the library you are using conforms to the `sqlite3` API, you can use it as
the driver.

**`example`** 

```
import sqlite from 'sqlite3'

const driver = sqlite.Database
```

###  filename

• **filename**: *string*

*Defined in [interfaces/Sqlite.interfaces.ts:23](https://github.com/kriasoft/node-sqlite/blob/16a8dec/src/interfaces/Sqlite.interfaces.ts#L23)*

Valid values are filenames, ":memory:" for an anonymous in-memory
database and an empty string for an anonymous disk-based database.
Anonymous databases are not persisted and when closing the database
handle, their contents are lost.

### `Optional` mode

• **mode**? : *number*

*Defined in [interfaces/Sqlite.interfaces.ts:29](https://github.com/kriasoft/node-sqlite/blob/16a8dec/src/interfaces/Sqlite.interfaces.ts#L29)*

One or more of sqlite3.OPEN_READONLY, sqlite3.OPEN_READWRITE and
sqlite3.OPEN_CREATE. The default value is OPEN_READWRITE | OPEN_CREATE.

###  RunResult

• **RunResult**:

*Defined in [interfaces/Sqlite.interfaces.ts:49](https://github.com/kriasoft/node-sqlite/blob/16a8dec/src/interfaces/Sqlite.interfaces.ts#L49)*

### `Optional` changes

• **changes**? : *number*

*Defined in [interfaces/Sqlite.interfaces.ts:71](https://github.com/kriasoft/node-sqlite/blob/16a8dec/src/interfaces/Sqlite.interfaces.ts#L71)*

Number of rows changed.

Only contains valid information when the query was a
successfully completed UPDATE or DELETE statement.

### `Optional` lastID

• **lastID**? : *number*

*Defined in [interfaces/Sqlite.interfaces.ts:64](https://github.com/kriasoft/node-sqlite/blob/16a8dec/src/interfaces/Sqlite.interfaces.ts#L64)*

Row id of the inserted row.

Only contains valid information when the query was a successfully
completed INSERT statement.

###  stmt

• **stmt**: *[Statement](../classes/_statement_.statement.md)*

*Defined in [interfaces/Sqlite.interfaces.ts:57](https://github.com/kriasoft/node-sqlite/blob/16a8dec/src/interfaces/Sqlite.interfaces.ts#L57)*

Statement object.

It is not possible to run the statement again because it is
automatically finalized after running for the first time.
Any subsequent attempts to run the statement again will fail.

###  ConfigureOption

Ƭ **ConfigureOption**: *"trace" | "profile" | "busyTimeout"*

*Defined in [interfaces/Sqlite.interfaces.ts:47](https://github.com/kriasoft/node-sqlite/blob/16a8dec/src/interfaces/Sqlite.interfaces.ts#L47)*

###  SqlType

Ƭ **SqlType**: *SQLStatement | string*

*Defined in [interfaces/Sqlite.interfaces.ts:14](https://github.com/kriasoft/node-sqlite/blob/16a8dec/src/interfaces/Sqlite.interfaces.ts#L14)*

Allows for input of a normal SQL string or
`sql-template-strings` object
