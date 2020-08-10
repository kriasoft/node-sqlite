[sqlite](../README.md) › [Globals](../globals.md) › ["src/index"](_src_index_.md)

# Module: "src/index"

## Index

### Functions

* [open](_src_index_.md#open)

## Functions

###  open

▸ **open**‹**Driver**, **Stmt**›(`config`: [Config](../interfaces/_src_interfaces_.isqlite.config.md)): *Promise‹[Database](../classes/_src_database_.database.md)›*

*Defined in [src/index.ts:11](https://github.com/kriasoft/node-sqlite/blob/244b720/src/index.ts#L11)*

Opens a database for manipulation. Most users will call this to get started.

**Type parameters:**

▪ **Driver**: *Database*

▪ **Stmt**: *Statement*

**Parameters:**

Name | Type |
------ | ------ |
`config` | [Config](../interfaces/_src_interfaces_.isqlite.config.md) |

**Returns:** *Promise‹[Database](../classes/_src_database_.database.md)›*
