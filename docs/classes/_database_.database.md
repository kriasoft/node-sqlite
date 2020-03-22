[sqlite](../README.md) › [Globals](../globals.md) › ["Database"](../modules/_database_.md) › [Database](_database_.database.md)

# Class: Database <**Driver, Stmt**>

Promisified wrapper for the sqlite3#Database interface.

## Type parameters

▪ **Driver**: *Database*

▪ **Stmt**: *Statement*

## Hierarchy

* **Database**

## Index

### Constructors

* [constructor](_database_.database.md#constructor)

### Properties

* [config](_database_.database.md#config)
* [db](_database_.database.md#db)

### Methods

* [all](_database_.database.md#all)
* [close](_database_.database.md#close)
* [configure](_database_.database.md#configure)
* [each](_database_.database.md#each)
* [exec](_database_.database.md#exec)
* [get](_database_.database.md#get)
* [getDatabaseInstance](_database_.database.md#getdatabaseinstance)
* [loadExtension](_database_.database.md#loadextension)
* [migrate](_database_.database.md#migrate)
* [on](_database_.database.md#on)
* [open](_database_.database.md#open)
* [parallelize](_database_.database.md#parallelize)
* [prepare](_database_.database.md#prepare)
* [run](_database_.database.md#run)
* [serialize](_database_.database.md#serialize)

## Constructors

###  constructor

\+ **new Database**(`config`: [Config](../modules/_interfaces_sqlite_interfaces_.md#config)): *[Database](_database_.database.md)*

*Defined in [Database.ts:16](https://github.com/kriasoft/node-sqlite/blob/8aac44a/src/Database.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`config` | [Config](../modules/_interfaces_sqlite_interfaces_.md#config) |

**Returns:** *[Database](_database_.database.md)*

## Properties

###  config

• **config**: *[Config](../modules/_interfaces_sqlite_interfaces_.md#config)*

*Defined in [Database.ts:15](https://github.com/kriasoft/node-sqlite/blob/8aac44a/src/Database.ts#L15)*

___

###  db

• **db**: *Driver*

*Defined in [Database.ts:16](https://github.com/kriasoft/node-sqlite/blob/8aac44a/src/Database.ts#L16)*

## Methods

###  all

▸ **all**<**T**>(`sql`: [SqlType](../modules/_interfaces_sqlite_interfaces_.md#sqltype), ...`params`: any[]): *Promise‹T›*

*Defined in [Database.ts:237](https://github.com/kriasoft/node-sqlite/blob/8aac44a/src/Database.ts#L237)*

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

Name | Type | Description |
------ | ------ | ------ |
`sql` | [SqlType](../modules/_interfaces_sqlite_interfaces_.md#sqltype) | The SQL query to run.  |
`...params` | any[] | - |

**Returns:** *Promise‹T›*

___

###  close

▸ **close**(): *Promise‹void›*

*Defined in [Database.ts:76](https://github.com/kriasoft/node-sqlite/blob/8aac44a/src/Database.ts#L76)*

Closes the database.

**Returns:** *Promise‹void›*

___

###  configure

▸ **configure**(`option`: [ConfigureOption](../modules/_interfaces_sqlite_interfaces_.md#configureoption), `value`: any): *any*

*Defined in [Database.ts:91](https://github.com/kriasoft/node-sqlite/blob/8aac44a/src/Database.ts#L91)*

**`see`** https://github.com/mapbox/node-sqlite3/wiki/API#databaseconfigureoption-value

**Parameters:**

Name | Type |
------ | ------ |
`option` | [ConfigureOption](../modules/_interfaces_sqlite_interfaces_.md#configureoption) |
`value` | any |

**Returns:** *any*

___

###  each

▸ **each**<**T**>(`sql`: [SqlType](../modules/_interfaces_sqlite_interfaces_.md#sqltype), ...`params`: any[]): *Promise‹number›*

*Defined in [Database.ts:181](https://github.com/kriasoft/node-sqlite/blob/8aac44a/src/Database.ts#L181)*

Runs the SQL query with the specified parameters and calls the callback once for each result
row. The parameters are the same as the Database#run function, with the following differences:

If the result set succeeds but is empty, the callback is never called.
In all other cases, the callback is called once for every retrieved row.
The order of calls correspond exactly to the order of rows in the result set.

There is currently no way to abort execution!

The last parameter to each() *must* be a callback function.

**`example`** await db.each('SELECT * FROM x WHERE y = ?', 'z', (err, row) => {
  // row contains the row data
  // each() resolves when there are no more rows to fetch
})

**`see`** https://github.com/mapbox/node-sqlite3/wiki/API#databaseeachsql-param--callback-complete

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`sql` | [SqlType](../modules/_interfaces_sqlite_interfaces_.md#sqltype) |
`...params` | any[] |

**Returns:** *Promise‹number›*

Promise<number> Number of rows returned

___

###  exec

▸ **exec**(`sql`: [SqlType](../modules/_interfaces_sqlite_interfaces_.md#sqltype)): *Promise‹void›*

*Defined in [Database.ts:262](https://github.com/kriasoft/node-sqlite/blob/8aac44a/src/Database.ts#L262)*

Runs all SQL queries in the supplied string. No result rows are retrieved. If a query fails,
no subsequent statements will be executed (wrap it in a transaction if you want all
or none to be executed).

Note: This function will only execute statements up to the first NULL byte.
Comments are not allowed and will lead to runtime errors.

**`see`** https://github.com/mapbox/node-sqlite3/wiki/API#databaseexecsql-callback

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`sql` | [SqlType](../modules/_interfaces_sqlite_interfaces_.md#sqltype) | The SQL query to run. |

**Returns:** *Promise‹void›*

___

###  get

▸ **get**<**T**>(`sql`: [SqlType](../modules/_interfaces_sqlite_interfaces_.md#sqltype), ...`params`: any[]): *Promise‹T | undefined›*

*Defined in [Database.ts:144](https://github.com/kriasoft/node-sqlite/blob/8aac44a/src/Database.ts#L144)*

Runs the SQL query with the specified parameters and resolves with
with the first result row afterwards. If the result set is empty, returns undefined.

The property names correspond to the column names of the result set.
It is impossible to access them by column index; the only supported way is by column name.

**`see`** https://github.com/mapbox/node-sqlite3/wiki/API#databasegetsql-param--callback

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`sql` | [SqlType](../modules/_interfaces_sqlite_interfaces_.md#sqltype) | The SQL query to run.  |
`...params` | any[] | - |

**Returns:** *Promise‹T | undefined›*

___

###  getDatabaseInstance

▸ **getDatabaseInstance**(): *Driver*

*Defined in [Database.ts:34](https://github.com/kriasoft/node-sqlite/blob/8aac44a/src/Database.ts#L34)*

Returns the underlying sqlite3 Database instance

**Returns:** *Driver*

___

###  loadExtension

▸ **loadExtension**(`path`: string): *Promise‹unknown›*

*Defined in [Database.ts:307](https://github.com/kriasoft/node-sqlite/blob/8aac44a/src/Database.ts#L307)*

Loads a compiled SQLite extension into the database connection object.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`path` | string | Filename of the extension to load  |

**Returns:** *Promise‹unknown›*

___

###  migrate

▸ **migrate**(`config?`: [MigrationParams](../modules/_interfaces_migrate_interfaces_.md#migrationparams)): *Promise‹void›*

*Defined in [Database.ts:325](https://github.com/kriasoft/node-sqlite/blob/8aac44a/src/Database.ts#L325)*

Performs a database migration.

**Parameters:**

Name | Type |
------ | ------ |
`config?` | [MigrationParams](../modules/_interfaces_migrate_interfaces_.md#migrationparams) |

**Returns:** *Promise‹void›*

___

###  on

▸ **on**(`event`: string, `listener`: any): *void*

*Defined in [Database.ts:27](https://github.com/kriasoft/node-sqlite/blob/8aac44a/src/Database.ts#L27)*

Event handler when verbose mode is enabled.

**`see`** https://github.com/mapbox/node-sqlite3/wiki/Debugging

**Parameters:**

Name | Type |
------ | ------ |
`event` | string |
`listener` | any |

**Returns:** *void*

___

###  open

▸ **open**(): *Promise‹void›*

*Defined in [Database.ts:41](https://github.com/kriasoft/node-sqlite/blob/8aac44a/src/Database.ts#L41)*

Opens the database

**Returns:** *Promise‹void›*

___

###  parallelize

▸ **parallelize**(): *void*

*Defined in [Database.ts:345](https://github.com/kriasoft/node-sqlite/blob/8aac44a/src/Database.ts#L345)*

**Returns:** *void*

___

###  prepare

▸ **prepare**(`sql`: [SqlType](../modules/_interfaces_sqlite_interfaces_.md#sqltype), ...`params`: any[]): *Promise‹[Statement](_statement_.statement.md)‹Stmt››*

*Defined in [Database.ts:288](https://github.com/kriasoft/node-sqlite/blob/8aac44a/src/Database.ts#L288)*

Prepares the SQL statement and optionally binds the specified parameters.
When bind parameters are supplied, they are bound to the prepared statement.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`sql` | [SqlType](../modules/_interfaces_sqlite_interfaces_.md#sqltype) | The SQL query to run. |
`...params` | any[] | - |

**Returns:** *Promise‹[Statement](_statement_.statement.md)‹Stmt››*

Promise<Statement> Statement object

___

###  run

▸ **run**(`sql`: [SqlType](../modules/_interfaces_sqlite_interfaces_.md#sqltype), ...`params`: any[]): *Promise‹[RunResult](../modules/_interfaces_sqlite_interfaces_.md#runresult)‹Stmt››*

*Defined in [Database.ts:109](https://github.com/kriasoft/node-sqlite/blob/8aac44a/src/Database.ts#L109)*

Runs the SQL query with the specified parameters. It does not retrieve any result data.
The function returns the Database object for which it was called to allow for function chaining.

**`see`** https://github.com/mapbox/node-sqlite3/wiki/API#databaserunsql-param--callback

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`sql` | [SqlType](../modules/_interfaces_sqlite_interfaces_.md#sqltype) | The SQL query to run.  |
`...params` | any[] | - |

**Returns:** *Promise‹[RunResult](../modules/_interfaces_sqlite_interfaces_.md#runresult)‹Stmt››*

___

###  serialize

▸ **serialize**(): *void*

*Defined in [Database.ts:336](https://github.com/kriasoft/node-sqlite/blob/8aac44a/src/Database.ts#L336)*

The methods underneath requires creative work to implement. PRs / proposals accepted!

**Returns:** *void*
