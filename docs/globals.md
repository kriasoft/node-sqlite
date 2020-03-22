[sqlite](README.md) › [Globals](globals.md)

# sqlite

## Index

### Namespaces

* [ISqlite](globals.md#isqlite)
* [Migrate](globals.md#migrate)

### Classes

* [Database](classes/database.md)
* [Statement](classes/statement.md)

### Interfaces

* [SqlObj](interfaces/sqlobj.md)

### Variables

* [MigrationFile](globals.md#migrationfile)
* [MigrationParams](globals.md#migrationparams)

### Functions

* [migrate](globals.md#migrate)
* [open](globals.md#open)
* [toSqlParams](globals.md#tosqlparams)

## Namespaces

###  ISqlite

• **ISqlite**:

*Defined in [interfaces/Sqlite.interfaces.ts:9](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/interfaces/Sqlite.interfaces.ts#L9)*

###  Config

• **Config**:

*Defined in [interfaces/Sqlite.interfaces.ts:16](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/interfaces/Sqlite.interfaces.ts#L16)*

###  driver

• **driver**: *any*

*Defined in [interfaces/Sqlite.interfaces.ts:44](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/interfaces/Sqlite.interfaces.ts#L44)*

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

*Defined in [interfaces/Sqlite.interfaces.ts:23](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/interfaces/Sqlite.interfaces.ts#L23)*

Valid values are filenames, ":memory:" for an anonymous in-memory
database and an empty string for an anonymous disk-based database.
Anonymous databases are not persisted and when closing the database
handle, their contents are lost.

### `Optional` mode

• **mode**? : *number*

*Defined in [interfaces/Sqlite.interfaces.ts:29](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/interfaces/Sqlite.interfaces.ts#L29)*

One or more of sqlite3.OPEN_READONLY, sqlite3.OPEN_READWRITE and
sqlite3.OPEN_CREATE. The default value is OPEN_READWRITE | OPEN_CREATE.

###  RunResult

• **RunResult**:

*Defined in [interfaces/Sqlite.interfaces.ts:49](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/interfaces/Sqlite.interfaces.ts#L49)*

### `Optional` changes

• **changes**? : *number*

*Defined in [interfaces/Sqlite.interfaces.ts:71](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/interfaces/Sqlite.interfaces.ts#L71)*

Number of rows changed.

Only contains valid information when the query was a
successfully completed UPDATE or DELETE statement.

### `Optional` lastID

• **lastID**? : *number*

*Defined in [interfaces/Sqlite.interfaces.ts:64](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/interfaces/Sqlite.interfaces.ts#L64)*

Row id of the inserted row.

Only contains valid information when the query was a successfully
completed INSERT statement.

###  stmt

• **stmt**: *[Statement](classes/statement.md)*

*Defined in [interfaces/Sqlite.interfaces.ts:57](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/interfaces/Sqlite.interfaces.ts#L57)*

Statement object.

It is not possible to run the statement again because it is
automatically finalized after running for the first time.
Any subsequent attempts to run the statement again will fail.

###  ConfigureOption

Ƭ **ConfigureOption**: *"trace" | "profile" | "busyTimeout"*

*Defined in [interfaces/Sqlite.interfaces.ts:47](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/interfaces/Sqlite.interfaces.ts#L47)*

###  SqlType

Ƭ **SqlType**: *SQLStatement | string*

*Defined in [interfaces/Sqlite.interfaces.ts:14](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/interfaces/Sqlite.interfaces.ts#L14)*

Allows for input of a normal SQL string or
`sql-template-strings` object

___

###  Migrate

• **Migrate**:

*Defined in [interfaces/migrate.interfaces.ts:1](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/interfaces/migrate.interfaces.ts#L1)*

###  MigrationFile

• **MigrationFile**:

*Defined in [interfaces/migrate.interfaces.ts:18](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/interfaces/migrate.interfaces.ts#L18)*

### `Optional` down

• **down**? : *string*

*Defined in [interfaces/migrate.interfaces.ts:23](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/interfaces/migrate.interfaces.ts#L23)*

###  filename

• **filename**: *string*

*Defined in [interfaces/migrate.interfaces.ts:21](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/interfaces/migrate.interfaces.ts#L21)*

###  id

• **id**: *number*

*Defined in [interfaces/migrate.interfaces.ts:19](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/interfaces/migrate.interfaces.ts#L19)*

###  name

• **name**: *string*

*Defined in [interfaces/migrate.interfaces.ts:20](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/interfaces/migrate.interfaces.ts#L20)*

### `Optional` up

• **up**? : *string*

*Defined in [interfaces/migrate.interfaces.ts:22](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/interfaces/migrate.interfaces.ts#L22)*

###  MigrationParams

• **MigrationParams**:

*Defined in [interfaces/migrate.interfaces.ts:2](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/interfaces/migrate.interfaces.ts#L2)*

### `Optional` force

• **force**? : *boolean*

*Defined in [interfaces/migrate.interfaces.ts:7](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/interfaces/migrate.interfaces.ts#L7)*

If true, will force the migration API to rollback and re-apply the latest migration over
again each time when Node.js app launches.

### `Optional` migrationsPath

• **migrationsPath**? : *string*

*Defined in [interfaces/migrate.interfaces.ts:15](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/interfaces/migrate.interfaces.ts#L15)*

Path to the migrations folder. Default is `path.join(process.cwd(), 'migrations')`

### `Optional` table

• **table**? : *string*

*Defined in [interfaces/migrate.interfaces.ts:11](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/interfaces/migrate.interfaces.ts#L11)*

Migrations table name. Default is 'migrations'

## Variables

###  MigrationFile

• **MigrationFile**: *any*

*Defined in [utils/migrate.ts:6](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/utils/migrate.ts#L6)*

___

###  MigrationParams

• **MigrationParams**: *any*

*Defined in [utils/migrate.ts:7](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/utils/migrate.ts#L7)*

*Defined in [Database.ts:9](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/Database.ts#L9)*

## Functions

###  migrate

▸ **migrate**(`db`: [Database](classes/database.md), `config`: [MigrationParams](globals.md#migrationparams)): *Promise‹void›*

*Defined in [utils/migrate.ts:12](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/utils/migrate.ts#L12)*

Migrates database schema to the latest version

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`db` | [Database](classes/database.md) | - |
`config` | [MigrationParams](globals.md#migrationparams) | {} |

**Returns:** *Promise‹void›*

___

###  open

▸ **open**<**Driver**>(`config`: [Config](globals.md#config)): *Promise‹[Database](classes/database.md)›*

*Defined in [index.ts:6](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/index.ts#L6)*

**Type parameters:**

▪ **Driver**: *Database*

**Parameters:**

Name | Type |
------ | ------ |
`config` | [Config](globals.md#config) |

**Returns:** *Promise‹[Database](classes/database.md)›*

___

###  toSqlParams

▸ **toSqlParams**(`sql`: [SqlType](globals.md#sqltype), `params`: any[]): *[SqlObj](interfaces/sqlobj.md)*

*Defined in [utils/strings.ts:10](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/utils/strings.ts#L10)*

Allows for using strings and `sql-template-strings`. Converts both to a
format that's usable by the SQL methods

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`sql` | [SqlType](globals.md#sqltype) | - | A SQL string or `sql-template-strings` object |
`params` | any[] | [] | An array of parameters  |

**Returns:** *[SqlObj](interfaces/sqlobj.md)*
