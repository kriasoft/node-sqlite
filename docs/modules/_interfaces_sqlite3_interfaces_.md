[sqlite](../README.md) › [Globals](../globals.md) › ["interfaces/Sqlite3.interfaces"](_interfaces_sqlite3_interfaces_.md)

# Module: "interfaces/Sqlite3.interfaces"

## Index

### Namespaces

* ["sqlite3"](_interfaces_sqlite3_interfaces_.md#sqlite3)
* [Sqlite3](_interfaces_sqlite3_interfaces_.md#sqlite3)

### Interfaces

* [SqlObj](../interfaces/_interfaces_sqlite3_interfaces_.sqlobj.md)

## Namespaces

###  "sqlite3"

• **"sqlite3"**:

*Defined in [interfaces/Sqlite.interfaces.ts:72](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/interfaces/Sqlite3.interfaces.ts#L72)*

###  Database

• **Database**:

*Defined in [interfaces/Sqlite.interfaces.ts:73](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/interfaces/Sqlite3.interfaces.ts#L73)*

###  loadExtension

▸ **loadExtension**(`path`: string, `callback?`: function): *any*

*Defined in [interfaces/Sqlite.interfaces.ts:74](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/interfaces/Sqlite3.interfaces.ts#L74)*

**Parameters:**

▪ **path**: *string*

▪`Optional`  **callback**: *function*

▸ (`err`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`err` | any |

**Returns:** *any*

___

###  Sqlite3

• **Sqlite3**:

*Defined in [interfaces/Sqlite.interfaces.ts:11](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/interfaces/Sqlite3.interfaces.ts#L11)*

###  OpenDatabaseEnum

• **OpenDatabaseEnum**:

*Defined in [interfaces/Sqlite.interfaces.ts:38](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/interfaces/Sqlite3.interfaces.ts#L38)*

###  OPEN_CREATE

• **OPEN_CREATE**: = sqlite.OPEN_CREATE

*Defined in [interfaces/Sqlite.interfaces.ts:41](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/interfaces/Sqlite3.interfaces.ts#L41)*

###  OPEN_READONLY

• **OPEN_READONLY**: = sqlite.OPEN_READONLY

*Defined in [interfaces/Sqlite.interfaces.ts:39](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/interfaces/Sqlite3.interfaces.ts#L39)*

###  OPEN_READWRITE

• **OPEN_READWRITE**: = sqlite.OPEN_READWRITE

*Defined in [interfaces/Sqlite.interfaces.ts:40](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/interfaces/Sqlite3.interfaces.ts#L40)*

###  Config

• **Config**:

*Defined in [interfaces/Sqlite.interfaces.ts:14](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/interfaces/Sqlite3.interfaces.ts#L14)*

###  filename

• **filename**: *string*

*Defined in [interfaces/Sqlite.interfaces.ts:21](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/interfaces/Sqlite3.interfaces.ts#L21)*

Valid values are filenames, ":memory:" for an anonymous in-memory
database and an empty string for an anonymous disk-based database.
Anonymous databases are not persisted and when closing the database
handle, their contents are lost.

### `Optional` mode

• **mode**? : *[OpenDatabaseEnum](_interfaces_sqlite3_interfaces_.md#opendatabaseenum)*

*Defined in [interfaces/Sqlite.interfaces.ts:27](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/interfaces/Sqlite3.interfaces.ts#L27)*

One or more of sqlite3.OPEN_READONLY, sqlite3.OPEN_READWRITE and
sqlite3.OPEN_CREATE. The default value is OPEN_READWRITE | OPEN_CREATE.

###  DatabaseConfigParams

• **DatabaseConfigParams**:

*Defined in [interfaces/Sqlite.interfaces.ts:30](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/interfaces/Sqlite3.interfaces.ts#L30)*

###  driver

• **driver**: *any*

*Defined in [interfaces/Sqlite.interfaces.ts:35](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/interfaces/Sqlite3.interfaces.ts#L35)*

Use an alternative library instead of sqlite3. The interface of the library must
conform to sqlite3.

###  filename

• **filename**: *string*

*Inherited from [Config](_interfaces_sqlite3_interfaces_.md#config).[filename](_interfaces_sqlite3_interfaces_.md#filename)*

*Defined in [interfaces/Sqlite.interfaces.ts:21](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/interfaces/Sqlite3.interfaces.ts#L21)*

Valid values are filenames, ":memory:" for an anonymous in-memory
database and an empty string for an anonymous disk-based database.
Anonymous databases are not persisted and when closing the database
handle, their contents are lost.

### `Optional` mode

• **mode**? : *[OpenDatabaseEnum](_interfaces_sqlite3_interfaces_.md#opendatabaseenum)*

*Inherited from [Config](_interfaces_sqlite3_interfaces_.md#config).[mode](_interfaces_sqlite3_interfaces_.md#optional-mode)*

*Defined in [interfaces/Sqlite.interfaces.ts:27](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/interfaces/Sqlite3.interfaces.ts#L27)*

One or more of sqlite3.OPEN_READONLY, sqlite3.OPEN_READWRITE and
sqlite3.OPEN_CREATE. The default value is OPEN_READWRITE | OPEN_CREATE.

###  RunResult

• **RunResult**:

*Defined in [interfaces/Sqlite.interfaces.ts:46](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/interfaces/Sqlite3.interfaces.ts#L46)*

### `Optional` changes

• **changes**? : *number*

*Defined in [interfaces/Sqlite.interfaces.ts:68](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/interfaces/Sqlite3.interfaces.ts#L68)*

Number of rows changed.

Only contains valid information when the query was a
successfully completed UPDATE or DELETE statement.

### `Optional` lastID

• **lastID**? : *number*

*Defined in [interfaces/Sqlite.interfaces.ts:61](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/interfaces/Sqlite3.interfaces.ts#L61)*

Row id of the inserted row.

Only contains valid information when the query was a successfully
completed INSERT statement.

###  stmt

• **stmt**: *[Statement](../classes/_sqlite3_sqlite3statement_.sqlite3statement.md)*

*Defined in [interfaces/Sqlite.interfaces.ts:54](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/interfaces/Sqlite3.interfaces.ts#L54)*

Statement object.

It is not possible to run the statement again because it is
automatically finalized after running for the first time.
Any subsequent attempts to run the statement again will fail.

###  ConfigureOption

Ƭ **ConfigureOption**: *"trace" | "profile" | "busyTimeout"*

*Defined in [interfaces/Sqlite.interfaces.ts:44](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/interfaces/Sqlite3.interfaces.ts#L44)*

###  SqlType

Ƭ **SqlType**: *SQLStatement | string*

*Defined in [interfaces/Sqlite.interfaces.ts:12](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/interfaces/Sqlite3.interfaces.ts#L12)*
