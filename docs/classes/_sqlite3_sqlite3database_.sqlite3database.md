[sqlite](../README.md) › [Globals](../globals.md) › ["sqlite3/Database"](../modules/_sqlite3_sqlite3database_.md) › [Database](_sqlite3_sqlite3database_.sqlite3database.md)

# Class: Database

## Hierarchy

* **Database**

## Index

### Constructors

* [constructor](_sqlite3_sqlite3database_.sqlite3database.md#constructor)

### Properties

* [config](_sqlite3_sqlite3database_.sqlite3database.md#config)
* [db](_sqlite3_sqlite3database_.sqlite3database.md#db)

### Methods

* [all](_sqlite3_sqlite3database_.sqlite3database.md#all)
* [close](_sqlite3_sqlite3database_.sqlite3database.md#close)
* [configure](_sqlite3_sqlite3database_.sqlite3database.md#configure)
* [each](_sqlite3_sqlite3database_.sqlite3database.md#each)
* [exec](_sqlite3_sqlite3database_.sqlite3database.md#exec)
* [get](_sqlite3_sqlite3database_.sqlite3database.md#get)
* [getDatabaseInstance](_sqlite3_sqlite3database_.sqlite3database.md#getdatabaseinstance)
* [loadExtension](_sqlite3_sqlite3database_.sqlite3database.md#loadextension)
* [migrate](_sqlite3_sqlite3database_.sqlite3database.md#migrate)
* [on](_sqlite3_sqlite3database_.sqlite3database.md#on)
* [open](_sqlite3_sqlite3database_.sqlite3database.md#open)
* [parallelize](_sqlite3_sqlite3database_.sqlite3database.md#parallelize)
* [prepare](_sqlite3_sqlite3database_.sqlite3database.md#prepare)
* [run](_sqlite3_sqlite3database_.sqlite3database.md#run)
* [serialize](_sqlite3_sqlite3database_.sqlite3database.md#serialize)
* [enableVerboseMode](_sqlite3_sqlite3database_.sqlite3database.md#static-enableverbosemode)

## Constructors

###  constructor

\+ **new Database**(`config`: [DatabaseConfigParams](../modules/_interfaces_sqlite3_interfaces_.md#databaseconfigparams)): *[Database](_sqlite3_sqlite3database_.sqlite3database.md)*

*Defined in [sqlite3/Database.ts:12](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/sqlite3/Sqlite3Database.ts#L12)*

**Parameters:**

Name | Type |
------ | ------ |
`config` | [DatabaseConfigParams](../modules/_interfaces_sqlite3_interfaces_.md#databaseconfigparams) |

**Returns:** *[Database](_sqlite3_sqlite3database_.sqlite3database.md)*

## Properties

###  config

• **config**: *[DatabaseConfigParams](../modules/_interfaces_sqlite3_interfaces_.md#databaseconfigparams)*

*Defined in [sqlite3/Database.ts:11](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/sqlite3/Sqlite3Database.ts#L11)*

___

###  db

• **db**: *[Database](../modules/_interfaces_sqlite3_interfaces_.md#database)*

*Defined in [sqlite3/Database.ts:12](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/sqlite3/Sqlite3Database.ts#L12)*

## Methods

###  all

▸ **all**<**T**>(`sql`: [SqlType](../modules/_interfaces_sqlite3_interfaces_.md#sqltype), ...`params`: any[]): *Promise‹T›*

*Defined in [sqlite3/Database.ts:236](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/sqlite3/Sqlite3Database.ts#L236)*

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
`sql` | [SqlType](../modules/_interfaces_sqlite3_interfaces_.md#sqltype) | The SQL query to run.  |
`...params` | any[] | - |

**Returns:** *Promise‹T›*

___

###  close

▸ **close**(): *Promise‹void›*

*Defined in [sqlite3/Database.ts:75](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/sqlite3/Sqlite3Database.ts#L75)*

Closes the database.

**Returns:** *Promise‹void›*

___

###  configure

▸ **configure**(`option`: [ConfigureOption](../modules/_interfaces_sqlite3_interfaces_.md#configureoption), `value`: any): *any*

*Defined in [sqlite3/Database.ts:90](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/sqlite3/Sqlite3Database.ts#L90)*

**`see`** https://github.com/mapbox/node-sqlite3/wiki/API#databaseconfigureoption-value

**Parameters:**

Name | Type |
------ | ------ |
`option` | [ConfigureOption](../modules/_interfaces_sqlite3_interfaces_.md#configureoption) |
`value` | any |

**Returns:** *any*

___

###  each

▸ **each**<**T**>(`sql`: [SqlType](../modules/_interfaces_sqlite3_interfaces_.md#sqltype), ...`params`: any[]): *Promise‹number›*

*Defined in [sqlite3/Database.ts:180](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/sqlite3/Sqlite3Database.ts#L180)*

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
`sql` | [SqlType](../modules/_interfaces_sqlite3_interfaces_.md#sqltype) |
`...params` | any[] |

**Returns:** *Promise‹number›*

Promise<number> Number of rows returned

___

###  exec

▸ **exec**(`sql`: [SqlType](../modules/_interfaces_sqlite3_interfaces_.md#sqltype)): *Promise‹void›*

*Defined in [sqlite3/Database.ts:261](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/sqlite3/Sqlite3Database.ts#L261)*

Runs all SQL queries in the supplied string. No result rows are retrieved. If a query fails,
no subsequent statements will be executed (wrap it in a transaction if you want all
or none to be executed).

Note: This function will only execute statements up to the first NULL byte.
Comments are not allowed and will lead to runtime errors.

**`see`** https://github.com/mapbox/node-sqlite3/wiki/API#databaseexecsql-callback

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`sql` | [SqlType](../modules/_interfaces_sqlite3_interfaces_.md#sqltype) | The SQL query to run. |

**Returns:** *Promise‹void›*

___

###  get

▸ **get**<**T**>(`sql`: [SqlType](../modules/_interfaces_sqlite3_interfaces_.md#sqltype), ...`params`: any[]): *Promise‹T | undefined›*

*Defined in [sqlite3/Database.ts:143](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/sqlite3/Sqlite3Database.ts#L143)*

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
`sql` | [SqlType](../modules/_interfaces_sqlite3_interfaces_.md#sqltype) | The SQL query to run.  |
`...params` | any[] | - |

**Returns:** *Promise‹T | undefined›*

___

###  getDatabaseInstance

▸ **getDatabaseInstance**(): *[Database](../modules/_interfaces_sqlite3_interfaces_.md#database)‹›*

*Defined in [sqlite3/Database.ts:37](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/sqlite3/Sqlite3Database.ts#L37)*

Returns the underlying sqlite3 Database instance

**Returns:** *[Database](../modules/_interfaces_sqlite3_interfaces_.md#database)‹›*

___

###  loadExtension

▸ **loadExtension**(`path`: string): *Promise‹unknown›*

*Defined in [sqlite3/Database.ts:306](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/sqlite3/Sqlite3Database.ts#L306)*

Loads a compiled SQLite extension into the database connection object.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`path` | string | Filename of the extension to load  |

**Returns:** *Promise‹unknown›*

___

###  migrate

▸ **migrate**(`config?`: [MigrationParams](../modules/_interfaces_migrate_interfaces_.md#migrationparams)): *Promise‹void›*

*Defined in [sqlite3/Database.ts:321](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/sqlite3/Sqlite3Database.ts#L321)*

Performs a database migration.

**Parameters:**

Name | Type |
------ | ------ |
`config?` | [MigrationParams](../modules/_interfaces_migrate_interfaces_.md#migrationparams) |

**Returns:** *Promise‹void›*

___

###  on

▸ **on**(`event`: string, `listener`: any): *void*

*Defined in [sqlite3/Database.ts:30](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/sqlite3/Sqlite3Database.ts#L30)*

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

*Defined in [sqlite3/Database.ts:44](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/sqlite3/Sqlite3Database.ts#L44)*

Opens the database

**Returns:** *Promise‹void›*

___

###  parallelize

▸ **parallelize**(): *void*

*Defined in [sqlite3/Database.ts:341](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/sqlite3/Sqlite3Database.ts#L341)*

**Returns:** *void*

___

###  prepare

▸ **prepare**(`sql`: [SqlType](../modules/_interfaces_sqlite3_interfaces_.md#sqltype), ...`params`: any[]): *Promise‹[Statement](_sqlite3_sqlite3statement_.sqlite3statement.md)›*

*Defined in [sqlite3/Database.ts:287](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/sqlite3/Sqlite3Database.ts#L287)*

Prepares the SQL statement and optionally binds the specified parameters.
When bind parameters are supplied, they are bound to the prepared statement.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`sql` | [SqlType](../modules/_interfaces_sqlite3_interfaces_.md#sqltype) | The SQL query to run. |
`...params` | any[] | - |

**Returns:** *Promise‹[Statement](_sqlite3_sqlite3statement_.sqlite3statement.md)›*

Promise<Statement> Statement object

___

###  run

▸ **run**(`sql`: [SqlType](../modules/_interfaces_sqlite3_interfaces_.md#sqltype), ...`params`: any[]): *Promise‹[RunResult](../modules/_interfaces_sqlite3_interfaces_.md#runresult)›*

*Defined in [sqlite3/Database.ts:108](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/sqlite3/Sqlite3Database.ts#L108)*

Runs the SQL query with the specified parameters. It does not retrieve any result data.
The function returns the Database object for which it was called to allow for function chaining.

**`see`** https://github.com/mapbox/node-sqlite3/wiki/API#databaserunsql-param--callback

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`sql` | [SqlType](../modules/_interfaces_sqlite3_interfaces_.md#sqltype) | The SQL query to run.  |
`...params` | any[] | - |

**Returns:** *Promise‹[RunResult](../modules/_interfaces_sqlite3_interfaces_.md#runresult)›*

___

###  serialize

▸ **serialize**(): *void*

*Defined in [sqlite3/Database.ts:332](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/sqlite3/Sqlite3Database.ts#L332)*

The methods underneath requires creative work to implement. PRs / proposals accepted!

**Returns:** *void*

___

### `Static` enableVerboseMode

▸ **enableVerboseMode**(): *void*

*Defined in [sqlite3/Database.ts:22](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/sqlite3/Sqlite3Database.ts#L22)*

**`see`** https://github.com/mapbox/node-sqlite3/wiki/Debugging

**Returns:** *void*
