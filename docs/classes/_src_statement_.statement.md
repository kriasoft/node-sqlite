[sqlite](../README.md) › [Globals](../globals.md) › ["src/Statement"](../modules/_src_statement_.md) › [Statement](_src_statement_.statement.md)

# Class: Statement ‹**S**›

Promisified wrapper for the sqlite3#Statement interface.

## Type parameters

▪ **S**: _Statement_

## Hierarchy

- **Statement**

## Index

### Constructors

- [constructor](_src_statement_.statement.md#constructor)

### Properties

- [stmt](_src_statement_.statement.md#stmt)

### Methods

- [all](_src_statement_.statement.md#all)
- [bind](_src_statement_.statement.md#bind)
- [each](_src_statement_.statement.md#each)
- [finalize](_src_statement_.statement.md#finalize)
- [get](_src_statement_.statement.md#get)
- [getStatementInstance](_src_statement_.statement.md#getstatementinstance)
- [reset](_src_statement_.statement.md#reset)
- [run](_src_statement_.statement.md#run)

## Constructors

### constructor

\+ **new Statement**(`stmt`: S): _[Statement](\_src_statement_.statement.md)\_

_Defined in [src/Statement.ts:8](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/Statement.ts#L8)_

**Parameters:**

| Name   | Type |
| ------ | ---- |
| `stmt` | S    |

**Returns:** _[Statement](\_src_statement_.statement.md)\_

## Properties

### stmt

• **stmt**: _S_

_Defined in [src/Statement.ts:8](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/Statement.ts#L8)_

## Methods

### all

▸ **all**‹**T**›(...`params`: any[]): _Promise‹T›_

_Defined in [src/Statement.ts:146](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/Statement.ts#L146)_

Binds parameters, executes the statement and calls the callback with all result rows.
The parameters are the same as the Statement#run function, with the following differences:

If the result set is empty, it will resolve to an empty array, otherwise it contains an
object for each result row which in turn contains the values of that row.
Like with Statement#run, the statement will not be finalized after executing this function.

**`see`** https://github.com/mapbox/node-sqlite3/wiki/API#databaseallsql-param--callback

**Type parameters:**

▪ **T**

**Parameters:**

| Name        | Type  |
| ----------- | ----- |
| `...params` | any[] |

**Returns:** _Promise‹T›_

---

### bind

▸ **bind**(...`params`: any[]): _Promise‹void›_

_Defined in [src/Statement.ts:27](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/Statement.ts#L27)_

Binds parameters to the prepared statement.

Binding parameters with this function completely resets the statement object and row cursor
and removes all previously bound parameters, if any.

**Parameters:**

| Name        | Type  |
| ----------- | ----- |
| `...params` | any[] |

**Returns:** _Promise‹void›_

---

### each

▸ **each**‹**T**›(...`params`: any[]): _Promise‹number›_

_Defined in [src/Statement.ts:180](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/Statement.ts#L180)_

Binds parameters, executes the statement and calls the callback for each result row.

If the result set succeeds but is empty, the callback is never called.
In all other cases, the callback is called once for every retrieved row.
The order of calls correspond exactly to the order of rows in the result set.

Like with Statement#run, the statement will not be finalized after executing this function.

There is currently no way to abort execution!

The last parameter to each() _must_ be a callback function, where the first parameter will
be the returned row.

**`example`** await stmt.each('someParamValue', (err, row) => {
// row contains the row data
// each() resolves when there are no more rows to fetch
})

**`see`** https://github.com/mapbox/node-sqlite3/wiki/API#statementeachparam--callback-complete

**Type parameters:**

▪ **T**

**Parameters:**

| Name        | Type  |
| ----------- | ----- |
| `...params` | any[] |

**Returns:** _Promise‹number›_

Promise<number> Number of rows returned

---

### finalize

▸ **finalize**(): _Promise‹void›_

_Defined in [src/Statement.ts:58](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/Statement.ts#L58)_

Finalizes the statement. This is typically optional, but if you experience long delays before
the next query is executed, explicitly finalizing your statement might be necessary.
This might be the case when you run an exclusive query (see section Control Flow).
After the statement is finalized, all further function calls on that statement object
will throw errors.

**Returns:** _Promise‹void›_

---

### get

▸ **get**‹**T**›(...`params`: any[]): _Promise‹T | undefined›_

_Defined in [src/Statement.ts:118](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/Statement.ts#L118)_

Binds parameters, executes the statement and retrieves the first result row.
The parameters are the same as the Statement#run function, with the following differences:

Using this method can leave the database locked, as the database awaits further
calls to Statement#get to retrieve subsequent rows. To inform the database that you
are finished retrieving rows, you should either finalize (with Statement#finalize)
or reset (with Statement#reset) the statement.

**Type parameters:**

▪ **T**

**Parameters:**

| Name        | Type  |
| ----------- | ----- |
| `...params` | any[] |

**Returns:** _Promise‹T | undefined›_

---

### getStatementInstance

▸ **getStatementInstance**(): _S_

_Defined in [src/Statement.ts:17](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/Statement.ts#L17)_

Returns the underlying sqlite3 Statement instance

**Returns:** _S_

---

### reset

▸ **reset**(): _Promise‹void›_

_Defined in [src/Statement.ts:43](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/Statement.ts#L43)_

Resets the row cursor of the statement and preserves the parameter bindings.
Use this function to re-execute the same query with the same bindings.

**Returns:** _Promise‹void›_

---

### run

▸ **run**(...`params`: any[]): _Promise‹[RunResult](../interfaces/\_src_interfaces_.isqlite.runresult.md)›\_

_Defined in [src/Statement.ts:85](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/Statement.ts#L85)_

Binds parameters and executes the statement.

If you specify bind parameters, they will be bound to the statement before it is executed.
Note that the bindings and the row cursor are reset when you specify even a single bind parameter.

The execution behavior is identical to the Database#run method with the difference that the
statement will not be finalized after it is run. This means you can run it multiple times.

**Parameters:**

| Name        | Type  |
| ----------- | ----- |
| `...params` | any[] |

**Returns:** _Promise‹[RunResult](../interfaces/\_src_interfaces_.isqlite.runresult.md)›\_
