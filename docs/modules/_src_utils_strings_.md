[sqlite](../README.md) › [Globals](../globals.md) › ["src/utils/strings"](_src_utils_strings_.md)

# Module: "src/utils/strings"

## Index

### Functions

* [toSqlParams](_src_utils_strings_.md#tosqlparams)

## Functions

###  toSqlParams

▸ **toSqlParams**(`sql`: [SqlType](_src_interfaces_.isqlite.md#sqltype), `params`: any[]): *[SqlObj](../interfaces/_src_interfaces_.isqlite.sqlobj.md)*

*Defined in [src/utils/strings.ts:10](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/utils/strings.ts#L10)*

Allows for using strings and `sql-template-strings`. Converts both to a
format that's usable by the SQL methods

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`sql` | [SqlType](_src_interfaces_.isqlite.md#sqltype) | - | A SQL string or `sql-template-strings` object |
`params` | any[] | [] | An array of parameters  |

**Returns:** *[SqlObj](../interfaces/_src_interfaces_.isqlite.sqlobj.md)*
