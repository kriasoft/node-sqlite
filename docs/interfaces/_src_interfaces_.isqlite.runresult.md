[sqlite](../README.md) › [Globals](../globals.md) › ["src/interfaces"](../modules/_src_interfaces_.md) › [ISqlite](../modules/_src_interfaces_.isqlite.md) › [RunResult](_src_interfaces_.isqlite.runresult.md)

# Interface: RunResult ‹**Stmt**›

## Type parameters

▪ **Stmt**: _Statement_

## Hierarchy

- **RunResult**

## Index

### Properties

- [changes](_src_interfaces_.isqlite.runresult.md#optional-changes)
- [lastID](_src_interfaces_.isqlite.runresult.md#optional-lastid)
- [stmt](_src_interfaces_.isqlite.runresult.md#stmt)

## Properties

### `Optional` changes

• **changes**? : _number_

_Defined in [src/interfaces.ts:77](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/interfaces.ts#L77)_

Number of rows changed.

Only contains valid information when the query was a
successfully completed UPDATE or DELETE statement.

---

### `Optional` lastID

• **lastID**? : _number_

_Defined in [src/interfaces.ts:70](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/interfaces.ts#L70)_

Row id of the inserted row.

Only contains valid information when the query was a successfully
completed INSERT statement.

---

### stmt

• **stmt**: _[Statement](../classes/\_src_statement_.statement.md)‹Stmt›\_

_Defined in [src/interfaces.ts:63](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/interfaces.ts#L63)_

Statement object.

It is not possible to run the statement again because it is
automatically finalized after running for the first time.
Any subsequent attempts to run the statement again will fail.
