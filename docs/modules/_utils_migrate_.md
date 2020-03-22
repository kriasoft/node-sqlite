[sqlite](../README.md) › [Globals](../globals.md) › ["utils/migrate"](_utils_migrate_.md)

# Module: "utils/migrate"

## Index

### Variables

* [MigrationFile](_utils_migrate_.md#migrationfile)
* [MigrationParams](_utils_migrate_.md#migrationparams)

### Functions

* [migrate](_utils_migrate_.md#migrate)

## Variables

###  MigrationFile

• **MigrationFile**: *any*

*Defined in [utils/migrate.ts:6](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/utils/migrate.ts#L6)*

___

###  MigrationParams

• **MigrationParams**: *any*

*Defined in [utils/migrate.ts:7](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/utils/migrate.ts#L7)*

## Functions

###  migrate

▸ **migrate**(`db`: [Sqlite3Database](../classes/_sqlite3_sqlite3database_.sqlite3database.md), `config`: [MigrationParams](_interfaces_migrate_interfaces_.md#migrationparams)): *Promise‹void›*

*Defined in [utils/migrate.ts:12](https://github.com/theogravity/sqlite-v3/blob/d520ca5/src/utils/migrate.ts#L12)*

Migrates database schema to the latest version

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`db` | [Sqlite3Database](../classes/_sqlite3_sqlite3database_.sqlite3database.md) | - |
`config` | [MigrationParams](_interfaces_migrate_interfaces_.md#migrationparams) | {} |

**Returns:** *Promise‹void›*
