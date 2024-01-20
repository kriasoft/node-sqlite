[sqlite](../README.md) › [Globals](../globals.md) › ["src/Database"](../modules/_src_database_.md) › [Database](_src_database_.database.md)

# Class: Database ‹**Driver, Stmt**›

Promisified wrapper for the sqlite3#Database interface.

## Type parameters

▪ **Driver**: _Database_

▪ **Stmt**: _Statement_

## Hierarchy

- **Database**

## Index

### Constructors

- [constructor](_src_database_.database.md#constructor)

### Properties

- [config](_src_database_.database.md#config)
- [db](_src_database_.database.md#db)

### Methods

- [all](_src_database_.database.md#all)
- [close](_src_database_.database.md#close)
- [configure](_src_database_.database.md#configure)
- [each](_src_database_.database.md#each)
- [exec](_src_database_.database.md#exec)
- [get](_src_database_.database.md#get)
- [getDatabaseInstance](_src_database_.database.md#getdatabaseinstance)
- [loadExtension](_src_database_.database.md#loadextension)
- [migrate](_src_database_.database.md#migrate)
- [on](_src_database_.database.md#on)
- [open](_src_database_.database.md#open)
- [parallelize](_src_database_.database.md#parallelize)
- [prepare](_src_database_.database.md#prepare)
- [run](_src_database_.database.md#run)
- [serialize](_src_database_.database.md#serialize)

## Constructors

### constructor

\+ **new Database**(`config`: [Config](../interfaces/_src_interfaces_.isqlite.config.md)): _[Database](\_src_database_.database.md)\_

_Defined in [src/Database.ts:18](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/Database.ts#L18)_

**Parameters:**

| Name     | Type                                                       |
| -------- | ---------------------------------------------------------- |
| `config` | [Config](../interfaces/_src_interfaces_.isqlite.config.md) |

**Returns:** _[Database](\_src_database_.database.md)\_

## Properties

### config

• **config**: _[Config](../interfaces/\_src_interfaces_.isqlite.config.md)\_

_Defined in [src/Database.ts:17](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/Database.ts#L17)_

---

### db

• **db**: _Driver_

_Defined in [src/Database.ts:18](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/Database.ts#L18)_

## Methods

### all

▸ **all**‹**T**›(`sql`: [SqlType](../modules/_src_interfaces_.isqlite.md#sqltype), ...`params`: any[]): _Promise‹T›_

_Defined in [src/Database.ts:255](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/Database.ts#L255)_

Runs the SQL query with the specified parameters. The parameters are the same as the
Database#run function, with the following differences:

If the result set is empty, it will be an empty array, otherwise it will
have an object for each result row which
in turn contains the values of that row, like the Database#get function.

Note that it first retrieves all result rows and stores them in memory.
For queries that have potentially large result sets, use the Database#each
function to retrieve all rows or Database#prepare followed by multiple
Statement#get calls to retrieve a previously unknown amount of rows.

**`see`** https://github.com/mapbox/node-sqlite3/wiki/API#databaseallsql-param--callback

**Type parameters:**

▪ **T**

**Parameters:**

| Name        | Type                                                      | Description           |
| ----------- | --------------------------------------------------------- | --------------------- |
| `sql`       | [SqlType](../modules/_src_interfaces_.isqlite.md#sqltype) | The SQL query to run. |
| `...params` | any[]                                                     | -                     |

**Returns:** _Promise‹T›_

---

### close

▸ **close**(): _Promise‹void›_

_Defined in [src/Database.ts:79](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/Database.ts#L79)_

Closes the database.

**Returns:** _Promise‹void›_

---

### configure

▸ **configure**(`option`: [ConfigureOption](../modules/_src_interfaces_.isqlite.md#configureoption), `value`: any): _any_

_Defined in [src/Database.ts:94](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/Database.ts#L94)_

**`see`** https://github.com/mapbox/node-sqlite3/wiki/API#databaseconfigureoption-value

**Parameters:**

| Name     | Type                                                                      |
| -------- | ------------------------------------------------------------------------- |
| `option` | [ConfigureOption](../modules/_src_interfaces_.isqlite.md#configureoption) |
| `value`  | any                                                                       |

**Returns:** _any_

---

### each

▸ **each**‹**T**›(`sql`: [SqlType](../modules/_src_interfaces_.isqlite.md#sqltype), ...`params`: any[]): _Promise‹number›_

_Defined in [src/Database.ts:187](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/Database.ts#L187)_

Runs the SQL query with the specified parameters and calls the callback once for each result
row. The parameters are the same as the Database#run function, with the following differences:

If the result set succeeds but is empty, the callback is never called.
In all other cases, the callback is called once for every retrieved row.
The order of calls correspond exactly to the order of rows in the result set.

There is currently no way to abort execution!

The last parameter to each() _must_ be a callback function.

**`example`** await db.each('SELECT \* FROM x WHERE y = ?', 'z', (err, row) => {
// row contains the row data
// each() resolves when there are no more rows to fetch
})

**`see`** https://github.com/mapbox/node-sqlite3/wiki/API#databaseeachsql-param--callback-complete

**Type parameters:**

▪ **T**

**Parameters:**

| Name        | Type                                                      |
| ----------- | --------------------------------------------------------- |
| `sql`       | [SqlType](../modules/_src_interfaces_.isqlite.md#sqltype) |
| `...params` | any[]                                                     |

**Returns:** _Promise‹number›_

Promise<number> Number of rows returned

---

### exec

▸ **exec**(`sql`: [SqlType](../modules/_src_interfaces_.isqlite.md#sqltype)): _Promise‹void›_

_Defined in [src/Database.ts:280](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/Database.ts#L280)_

Runs all SQL queries in the supplied string. No result rows are retrieved. If a query fails,
no subsequent statements will be executed (wrap it in a transaction if you want all
or none to be executed).

Note: This function will only execute statements up to the first NULL byte.
Comments are not allowed and will lead to runtime errors.

**`see`** https://github.com/mapbox/node-sqlite3/wiki/API#databaseexecsql-callback

**Parameters:**

| Name  | Type                                                      | Description           |
| ----- | --------------------------------------------------------- | --------------------- |
| `sql` | [SqlType](../modules/_src_interfaces_.isqlite.md#sqltype) | The SQL query to run. |

**Returns:** _Promise‹void›_

---

### get

▸ **get**‹**T**›(`sql`: [SqlType](../modules/_src_interfaces_.isqlite.md#sqltype), ...`params`: any[]): _Promise‹T | undefined›_

_Defined in [src/Database.ts:150](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/Database.ts#L150)_

Runs the SQL query with the specified parameters and resolves with
with the first result row afterwards. If the result set is empty, returns undefined.

The property names correspond to the column names of the result set.
It is impossible to access them by column index; the only supported way is by column name.

**`see`** https://github.com/mapbox/node-sqlite3/wiki/API#databasegetsql-param--callback

**Type parameters:**

▪ **T**

**Parameters:**

| Name        | Type                                                      | Description           |
| ----------- | --------------------------------------------------------- | --------------------- |
| `sql`       | [SqlType](../modules/_src_interfaces_.isqlite.md#sqltype) | The SQL query to run. |
| `...params` | any[]                                                     | -                     |

**Returns:** _Promise‹T | undefined›_

---

### getDatabaseInstance

▸ **getDatabaseInstance**(): _Driver_

_Defined in [src/Database.ts:36](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/Database.ts#L36)_

Returns the underlying sqlite3 Database instance

**Returns:** _Driver_

---

### loadExtension

▸ **loadExtension**(`path`: string): _Promise‹unknown›_

_Defined in [src/Database.ts:325](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/Database.ts#L325)_

Loads a compiled SQLite extension into the database connection object.

**Parameters:**

| Name   | Type   | Description                       |
| ------ | ------ | --------------------------------- |
| `path` | string | Filename of the extension to load |

**Returns:** _Promise‹unknown›_

---

### migrate

▸ **migrate**(`config?`: [MigrationParams](../interfaces/_src_interfaces_.imigrate.migrationparams.md)): _Promise‹void›_

_Defined in [src/Database.ts:340](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/Database.ts#L340)_

Performs a database migration.

**Parameters:**

| Name      | Type                                                                          |
| --------- | ----------------------------------------------------------------------------- |
| `config?` | [MigrationParams](../interfaces/_src_interfaces_.imigrate.migrationparams.md) |

**Returns:** _Promise‹void›_

---

### on

▸ **on**(`event`: string, `listener`: any): _void_

_Defined in [src/Database.ts:29](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/Database.ts#L29)_

Event handler when verbose mode is enabled.

**`see`** https://github.com/mapbox/node-sqlite3/wiki/Debugging

**Parameters:**

| Name       | Type   |
| ---------- | ------ |
| `event`    | string |
| `listener` | any    |

**Returns:** _void_

---

### open

▸ **open**(): _Promise‹void›_

_Defined in [src/Database.ts:43](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/Database.ts#L43)_

Opens the database

**Returns:** _Promise‹void›_

---

### parallelize

▸ **parallelize**(): _void_

_Defined in [src/Database.ts:360](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/Database.ts#L360)_

**Returns:** _void_

---

### prepare

▸ **prepare**(`sql`: [SqlType](../modules/_src_interfaces_.isqlite.md#sqltype), ...`params`: any[]): _Promise‹[Statement](\_src_statement_.statement.md)‹Stmt››\_

_Defined in [src/Database.ts:306](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/Database.ts#L306)_

Prepares the SQL statement and optionally binds the specified parameters.
When bind parameters are supplied, they are bound to the prepared statement.

**Parameters:**

| Name        | Type                                                      | Description           |
| ----------- | --------------------------------------------------------- | --------------------- |
| `sql`       | [SqlType](../modules/_src_interfaces_.isqlite.md#sqltype) | The SQL query to run. |
| `...params` | any[]                                                     | -                     |

**Returns:** _Promise‹[Statement](\_src_statement_.statement.md)‹Stmt››\_

Promise<Statement> Statement object

---

### run

▸ **run**(`sql`: [SqlType](../modules/_src_interfaces_.isqlite.md#sqltype), ...`params`: any[]): _Promise‹[RunResult](../interfaces/\_src_interfaces_.isqlite.runresult.md)‹Stmt››\_

_Defined in [src/Database.ts:112](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/Database.ts#L112)_

Runs the SQL query with the specified parameters. It does not retrieve any result data.
The function returns the Database object for which it was called to allow for function chaining.

**`see`** https://github.com/mapbox/node-sqlite3/wiki/API#databaserunsql-param--callback

**Parameters:**

| Name        | Type                                                      | Description           |
| ----------- | --------------------------------------------------------- | --------------------- |
| `sql`       | [SqlType](../modules/_src_interfaces_.isqlite.md#sqltype) | The SQL query to run. |
| `...params` | any[]                                                     | -                     |

**Returns:** _Promise‹[RunResult](../interfaces/\_src_interfaces_.isqlite.runresult.md)‹Stmt››\_

---

### serialize

▸ **serialize**(): _void_

_Defined in [src/Database.ts:351](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/Database.ts#L351)_

The methods underneath requires creative work to implement. PRs / proposals accepted!

**Returns:** _void_
