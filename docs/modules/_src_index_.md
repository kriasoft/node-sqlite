[sqlite](../README.md) › [Globals](../globals.md) › ["src/index"](_src_index_.md)

# Module: "src/index"

## Index

### Functions

- [open](_src_index_.md#open)

## Functions

### open

▸ **open**‹**Driver**, **Stmt**›(`config`: [Config](../interfaces/_src_interfaces_.isqlite.config.md)): _Promise‹[Database](../classes/\_src_database_.database.md)›\_

_Defined in [src/index.ts:11](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/index.ts#L11)_

Opens a database for manipulation. Most users will call this to get started.

**Type parameters:**

▪ **Driver**: _Database_

▪ **Stmt**: _Statement_

**Parameters:**

| Name     | Type                                                       |
| -------- | ---------------------------------------------------------- |
| `config` | [Config](../interfaces/_src_interfaces_.isqlite.config.md) |

**Returns:** _Promise‹[Database](../classes/\_src_database_.database.md)›\_
