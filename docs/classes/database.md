[sqlite](../README.md) › [Globals](../globals.md) › [Database](database.md)

# Class: Database <**Driver**>

## Type parameters

▪ **Driver**: *Database*

## Hierarchy

* **Database**

## Index

### Constructors

* [constructor](database.md#constructor)

### Properties

* [config](database.md#config)
* [db](database.md#db)

### Methods

* [all](database.md#all)
* [close](database.md#close)
* [configure](database.md#configure)
* [each](database.md#each)
* [exec](database.md#exec)
* [get](database.md#get)
* [getDatabaseInstance](database.md#getdatabaseinstance)
* [loadExtension](database.md#loadextension)
* [migrate](database.md#migrate)
* [on](database.md#on)
* [open](database.md#open)
* [parallelize](database.md#parallelize)
* [prepare](database.md#prepare)
* [run](database.md#run)
* [serialize](database.md#serialize)

## Constructors

###  constructor

\+ **new Database**(`config`: [Config](../globals.md#config)): *[Database](database.md)*

*Defined in [Database.ts:13](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/Database.ts#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`config` | [Config](../globals.md#config) |

**Returns:** *[Database](database.md)*

## Properties

###  config

• **config**: *[Config](../globals.md#config)*

*Defined in [Database.ts:12](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/Database.ts#L12)*

___

###  db

• **db**: *Driver*

*Defined in [Database.ts:13](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/Database.ts#L13)*

## Methods

###  all

▸ **all**<**T**>(`sql`: [SqlType](../globals.md#sqltype), ...`params`: any[]): *Promise‹T›*

*Defined in [Database.ts:234](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/Database.ts#L234)*

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
`sql` | [SqlType](../globals.md#sqltype) | The SQL query to run.  |
`...params` | any[] | - |

**Returns:** *Promise‹T›*

___

###  close

▸ **close**(): *Promise‹void›*

*Defined in [Database.ts:73](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/Database.ts#L73)*

Closes the database.

**Returns:** *Promise‹void›*

___

###  configure

▸ **configure**(`option`: [ConfigureOption](../globals.md#configureoption), `value`: any): *any*

*Defined in [Database.ts:88](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/Database.ts#L88)*

**`see`** https://github.com/mapbox/node-sqlite3/wiki/API#databaseconfigureoption-value

**Parameters:**

Name | Type |
------ | ------ |
`option` | [ConfigureOption](../globals.md#configureoption) |
`value` | any |

**Returns:** *any*

___

###  each

▸ **each**<**T**>(`sql`: [SqlType](../globals.md#sqltype), ...`params`: any[]): *Promise‹number›*

*Defined in [Database.ts:178](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/Database.ts#L178)*

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
`sql` | [SqlType](../globals.md#sqltype) |
`...params` | any[] |

**Returns:** *Promise‹number›*

Promise<number> Number of rows returned

___

###  exec

▸ **exec**(`sql`: [SqlType](../globals.md#sqltype)): *Promise‹void›*

*Defined in [Database.ts:259](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/Database.ts#L259)*

Runs all SQL queries in the supplied string. No result rows are retrieved. If a query fails,
no subsequent statements will be executed (wrap it in a transaction if you want all
or none to be executed).

Note: This function will only execute statements up to the first NULL byte.
Comments are not allowed and will lead to runtime errors.

**`see`** https://github.com/mapbox/node-sqlite3/wiki/API#databaseexecsql-callback

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`sql` | [SqlType](../globals.md#sqltype) | The SQL query to run. |

**Returns:** *Promise‹void›*

___

###  get

▸ **get**<**T**>(`sql`: [SqlType](../globals.md#sqltype), ...`params`: any[]): *Promise‹T | undefined›*

*Defined in [Database.ts:141](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/Database.ts#L141)*

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
`sql` | [SqlType](../globals.md#sqltype) | The SQL query to run.  |
`...params` | any[] | - |

**Returns:** *Promise‹T | undefined›*

___

###  getDatabaseInstance

▸ **getDatabaseInstance**(): *Driver*

*Defined in [Database.ts:31](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/Database.ts#L31)*

Returns the underlying sqlite3 Database instance

**Returns:** *Driver*

___

###  loadExtension

▸ **loadExtension**(`path`: string): *Promise‹unknown›*

*Defined in [Database.ts:304](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/Database.ts#L304)*

Loads a compiled SQLite extension into the database connection object.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`path` | string | Filename of the extension to load  |

**Returns:** *Promise‹unknown›*

___

###  migrate

▸ **migrate**(`config?`: [MigrationParams](../globals.md#migrationparams)): *Promise‹void›*

*Defined in [Database.ts:322](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/Database.ts#L322)*

Performs a database migration.

**Parameters:**

Name | Type |
------ | ------ |
`config?` | [MigrationParams](../globals.md#migrationparams) |

**Returns:** *Promise‹void›*

___

###  on

▸ **on**(`event`: string, `listener`: any): *void*

*Defined in [Database.ts:24](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/Database.ts#L24)*

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

*Defined in [Database.ts:38](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/Database.ts#L38)*

Opens the database

**Returns:** *Promise‹void›*

___

###  parallelize

▸ **parallelize**(): *void*

*Defined in [Database.ts:342](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/Database.ts#L342)*

**Returns:** *void*

___

###  prepare

▸ **prepare**(`sql`: [SqlType](../globals.md#sqltype), ...`params`: any[]): *Promise‹[Statement](statement.md)›*

*Defined in [Database.ts:285](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/Database.ts#L285)*

Prepares the SQL statement and optionally binds the specified parameters.
When bind parameters are supplied, they are bound to the prepared statement.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`sql` | [SqlType](../globals.md#sqltype) | The SQL query to run. |
`...params` | any[] | - |

**Returns:** *Promise‹[Statement](statement.md)›*

Promise<Statement> Statement object

___

###  run

▸ **run**(`sql`: [SqlType](../globals.md#sqltype), ...`params`: any[]): *Promise‹[RunResult](../globals.md#runresult)›*

*Defined in [Database.ts:106](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/Database.ts#L106)*

Runs the SQL query with the specified parameters. It does not retrieve any result data.
The function returns the Database object for which it was called to allow for function chaining.

**`see`** https://github.com/mapbox/node-sqlite3/wiki/API#databaserunsql-param--callback

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`sql` | [SqlType](../globals.md#sqltype) | The SQL query to run.  |
`...params` | any[] | - |

**Returns:** *Promise‹[RunResult](../globals.md#runresult)›*

___

###  serialize

▸ **serialize**(): *void*

*Defined in [Database.ts:333](https://github.com/kriasoft/node-sqlite/blob/18fcde2/src/Database.ts#L333)*

The methods underneath requires creative work to implement. PRs / proposals accepted!

**Returns:** *void*
