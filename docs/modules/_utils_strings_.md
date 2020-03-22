[sqlite](../README.md) › [Globals](../globals.md) › ["utils/strings"](_utils_strings_.md)

# Module: "utils/strings"

## Index

### Functions

* [toSqlParams](_utils_strings_.md#tosqlparams)

## Functions

###  toSqlParams

▸ **toSqlParams**(`sql`: [SqlType](_interfaces_sqlite_interfaces_.md#sqltype), `params`: any[]): *[SqlObj](../interfaces/_interfaces_sqlite_interfaces_.sqlobj.md)*

*Defined in [utils/strings.ts:10](https://github.com/kriasoft/node-sqlite/blob/8aac44a/src/utils/strings.ts#L10)*

Allows for using strings and `sql-template-strings`. Converts both to a
format that's usable by the SQL methods

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`sql` | [SqlType](_interfaces_sqlite_interfaces_.md#sqltype) | - | A SQL string or `sql-template-strings` object |
`params` | any[] | [] | An array of parameters  |

**Returns:** *[SqlObj](../interfaces/_interfaces_sqlite_interfaces_.sqlobj.md)*
