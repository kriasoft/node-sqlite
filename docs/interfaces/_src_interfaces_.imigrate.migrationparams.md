[sqlite](../README.md) › [Globals](../globals.md) › ["src/interfaces"](../modules/_src_interfaces_.md) › [IMigrate](../modules/_src_interfaces_.imigrate.md) › [MigrationParams](_src_interfaces_.imigrate.migrationparams.md)

# Interface: MigrationParams

## Hierarchy

* **MigrationParams**

## Index

### Properties

* [force](_src_interfaces_.imigrate.migrationparams.md#optional-force)
* [migrationsPath](_src_interfaces_.imigrate.migrationparams.md#optional-migrationspath)
* [table](_src_interfaces_.imigrate.migrationparams.md#optional-table)

## Properties

### `Optional` force

• **force**? : *boolean*

*Defined in [src/interfaces.ts:87](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/interfaces.ts#L87)*

If true, will force the migration API to rollback and re-apply the latest migration over
again each time when Node.js app launches.

___

### `Optional` migrationsPath

• **migrationsPath**? : *string*

*Defined in [src/interfaces.ts:95](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/interfaces.ts#L95)*

Path to the migrations folder. Default is `path.join(process.cwd(), 'migrations')`

___

### `Optional` table

• **table**? : *string*

*Defined in [src/interfaces.ts:91](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/interfaces.ts#L91)*

Migrations table name. Default is 'migrations'
