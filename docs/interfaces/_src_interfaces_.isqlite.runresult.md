[sqlite](../README.md) › [Globals](../globals.md) › ["src/interfaces"](../modules/_src_interfaces_.md) › [ISqlite](../modules/_src_interfaces_.isqlite.md) › [RunResult](_src_interfaces_.isqlite.runresult.md)

# Interface: RunResult ‹**Stmt**›

## Type parameters

▪ **Stmt**: *Statement*

## Hierarchy

* **RunResult**

## Index

### Properties

* [changes](_src_interfaces_.isqlite.runresult.md#optional-changes)
* [lastID](_src_interfaces_.isqlite.runresult.md#optional-lastid)
* [stmt](_src_interfaces_.isqlite.runresult.md#stmt)

## Properties

### `Optional` changes

• **changes**? : *number*

*Defined in [src/interfaces.ts:77](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/interfaces.ts#L77)*

Number of rows changed.

Only contains valid information when the query was a
successfully completed UPDATE or DELETE statement.

___

### `Optional` lastID

• **lastID**? : *number*

*Defined in [src/interfaces.ts:70](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/interfaces.ts#L70)*

Row id of the inserted row.

Only contains valid information when the query was a successfully
completed INSERT statement.

___

###  stmt

• **stmt**: *[Statement](../classes/_src_statement_.statement.md)‹Stmt›*

*Defined in [src/interfaces.ts:63](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/interfaces.ts#L63)*

Statement object.

It is not possible to run the statement again because it is
automatically finalized after running for the first time.
Any subsequent attempts to run the statement again will fail.
