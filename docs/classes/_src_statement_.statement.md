[sqlite](../README.md) › [Globals](../globals.md) › ["src/Statement"](../modules/_src_statement_.md) › [Statement](_src_statement_.statement.md)

# Class: Statement ‹**S**›

Promisified wrapper for the sqlite3#Statement interface.

## Type parameters

▪ **S**: *Statement*

## Hierarchy

* **Statement**

## Index

### Constructors

* [constructor](_src_statement_.statement.md#constructor)

### Properties

* [stmt](_src_statement_.statement.md#stmt)

### Methods

* [all](_src_statement_.statement.md#all)
* [bind](_src_statement_.statement.md#bind)
* [each](_src_statement_.statement.md#each)
* [finalize](_src_statement_.statement.md#finalize)
* [get](_src_statement_.statement.md#get)
* [getStatementInstance](_src_statement_.statement.md#getstatementinstance)
* [reset](_src_statement_.statement.md#reset)
* [run](_src_statement_.statement.md#run)

## Constructors

###  constructor

\+ **new Statement**(`stmt`: S): *[Statement](_src_statement_.statement.md)*

*Defined in [src/Statement.ts:8](https://github.com/kriasoft/node-sqlite/blob/244b720/src/Statement.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`stmt` | S |

**Returns:** *[Statement](_src_statement_.statement.md)*

## Properties

###  stmt

• **stmt**: *S*

*Defined in [src/Statement.ts:8](https://github.com/kriasoft/node-sqlite/blob/244b720/src/Statement.ts#L8)*

## Methods

###  all

▸ **all**‹**T**›(...`params`: any[]): *Promise‹T›*

*Defined in [src/Statement.ts:146](https://github.com/kriasoft/node-sqlite/blob/244b720/src/Statement.ts#L146)*

Binds parameters, executes the statement and calls the callback with all result rows.
The parameters are the same as the Statement#run function, with the following differences:

If the result set is empty, it will resolve to an empty array, otherwise it contains an
object for each result row which in turn contains the values of that row.
Like with Statement#run, the statement will not be finalized after executing this function.

**`see`** https://github.com/mapbox/node-sqlite3/wiki/API#databaseallsql-param--callback

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`...params` | any[] |

**Returns:** *Promise‹T›*

___

###  bind

▸ **bind**(...`params`: any[]): *Promise‹void›*

*Defined in [src/Statement.ts:27](https://github.com/kriasoft/node-sqlite/blob/244b720/src/Statement.ts#L27)*

Binds parameters to the prepared statement.

Binding parameters with this function completely resets the statement object and row cursor
and removes all previously bound parameters, if any.

**Parameters:**

Name | Type |
------ | ------ |
`...params` | any[] |

**Returns:** *Promise‹void›*

___

###  each

▸ **each**‹**T**›(...`params`: any[]): *Promise‹number›*

*Defined in [src/Statement.ts:180](https://github.com/kriasoft/node-sqlite/blob/244b720/src/Statement.ts#L180)*

Binds parameters, executes the statement and calls the callback for each result row.

If the result set succeeds but is empty, the callback is never called.
In all other cases, the callback is called once for every retrieved row.
The order of calls correspond exactly to the order of rows in the result set.

Like with Statement#run, the statement will not be finalized after executing this function.

There is currently no way to abort execution!

The last parameter to each() *must* be a callback function, where the first parameter will
be the returned row.

**`example`** await stmt.each('someParamValue', (err, row) => {
  // row contains the row data
  // each() resolves when there are no more rows to fetch
})

**`see`** https://github.com/mapbox/node-sqlite3/wiki/API#statementeachparam--callback-complete

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`...params` | any[] |

**Returns:** *Promise‹number›*

Promise<number> Number of rows returned

___

###  finalize

▸ **finalize**(): *Promise‹void›*

*Defined in [src/Statement.ts:58](https://github.com/kriasoft/node-sqlite/blob/244b720/src/Statement.ts#L58)*

Finalizes the statement. This is typically optional, but if you experience long delays before
the next query is executed, explicitly finalizing your statement might be necessary.
This might be the case when you run an exclusive query (see section Control Flow).
After the statement is finalized, all further function calls on that statement object
will throw errors.

**Returns:** *Promise‹void›*

___

###  get

▸ **get**‹**T**›(...`params`: any[]): *Promise‹T | undefined›*

*Defined in [src/Statement.ts:118](https://github.com/kriasoft/node-sqlite/blob/244b720/src/Statement.ts#L118)*

Binds parameters, executes the statement and retrieves the first result row.
The parameters are the same as the Statement#run function, with the following differences:

Using this method can leave the database locked, as the database awaits further
calls to Statement#get to retrieve subsequent rows. To inform the database that you
are finished retrieving rows, you should either finalize (with Statement#finalize)
or reset (with Statement#reset) the statement.

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`...params` | any[] |

**Returns:** *Promise‹T | undefined›*

___

###  getStatementInstance

▸ **getStatementInstance**(): *S*

*Defined in [src/Statement.ts:17](https://github.com/kriasoft/node-sqlite/blob/244b720/src/Statement.ts#L17)*

Returns the underlying sqlite3 Statement instance

**Returns:** *S*

___

###  reset

▸ **reset**(): *Promise‹void›*

*Defined in [src/Statement.ts:43](https://github.com/kriasoft/node-sqlite/blob/244b720/src/Statement.ts#L43)*

Resets the row cursor of the statement and preserves the parameter bindings.
Use this function to re-execute the same query with the same bindings.

**Returns:** *Promise‹void›*

___

###  run

▸ **run**(...`params`: any[]): *Promise‹[RunResult](../interfaces/_src_interfaces_.isqlite.runresult.md)›*

*Defined in [src/Statement.ts:85](https://github.com/kriasoft/node-sqlite/blob/244b720/src/Statement.ts#L85)*

Binds parameters and executes the statement.

If you specify bind parameters, they will be bound to the statement before it is executed.
Note that the bindings and the row cursor are reset when you specify even a single bind parameter.

The execution behavior is identical to the Database#run method with the difference that the
statement will not be finalized after it is run. This means you can run it multiple times.

**Parameters:**

Name | Type |
------ | ------ |
`...params` | any[] |

**Returns:** *Promise‹[RunResult](../interfaces/_src_interfaces_.isqlite.runresult.md)›*
