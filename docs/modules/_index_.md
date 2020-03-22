[sqlite](../README.md) › [Globals](../globals.md) › ["index"](_index_.md)

# Module: "index"

## Index

### Functions

* [open](_index_.md#open)

## Functions

###  open

▸ **open**<**Driver**, **Stmt**>(`config`: [Config](_interfaces_sqlite_interfaces_.md#config)): *Promise‹[Database](../classes/_database_.database.md)›*

*Defined in [index.ts:9](https://github.com/kriasoft/node-sqlite/blob/8aac44a/src/index.ts#L9)*

Opens a database for manipulation. Most users will call this to get started.

**Type parameters:**

▪ **Driver**: *Database*

▪ **Stmt**: *Statement*

**Parameters:**

Name | Type |
------ | ------ |
`config` | [Config](_interfaces_sqlite_interfaces_.md#config) |

**Returns:** *Promise‹[Database](../classes/_database_.database.md)›*
