[sqlite](../README.md) › [Globals](../globals.md) › ["src/utils/migrate"](_src_utils_migrate_.md)

# Module: "src/utils/migrate"

## Index

### Functions

- [migrate](_src_utils_migrate_.md#migrate)

## Functions

### migrate

▸ **migrate**(`db`: [Database](../classes/_src_database_.database.md), `config`: [MigrationParams](../interfaces/_src_interfaces_.imigrate.migrationparams.md)): _Promise‹void›_

_Defined in [src/utils/migrate.ts:12](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/utils/migrate.ts#L12)_

Migrates database schema to the latest version

**Parameters:**

| Name     | Type                                                                          | Default |
| -------- | ----------------------------------------------------------------------------- | ------- |
| `db`     | [Database](../classes/_src_database_.database.md)                             | -       |
| `config` | [MigrationParams](../interfaces/_src_interfaces_.imigrate.migrationparams.md) | {}      |

**Returns:** _Promise‹void›_
