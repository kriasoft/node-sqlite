[sqlite](../README.md) › [Globals](../globals.md) › ["interfaces/migrate.interfaces"](_interfaces_migrate_interfaces_.md)

# Module: "interfaces/migrate.interfaces"

## Index

### Namespaces

* [Migrate](_interfaces_migrate_interfaces_.md#migrate)

## Namespaces

###  Migrate

• **Migrate**:

*Defined in [interfaces/migrate.interfaces.ts:1](https://github.com/kriasoft/node-sqlite/blob/16a8dec/src/interfaces/migrate.interfaces.ts#L1)*

###  MigrationFile

• **MigrationFile**:

*Defined in [interfaces/migrate.interfaces.ts:18](https://github.com/kriasoft/node-sqlite/blob/16a8dec/src/interfaces/migrate.interfaces.ts#L18)*

### `Optional` down

• **down**? : *string*

*Defined in [interfaces/migrate.interfaces.ts:23](https://github.com/kriasoft/node-sqlite/blob/16a8dec/src/interfaces/migrate.interfaces.ts#L23)*

###  filename

• **filename**: *string*

*Defined in [interfaces/migrate.interfaces.ts:21](https://github.com/kriasoft/node-sqlite/blob/16a8dec/src/interfaces/migrate.interfaces.ts#L21)*

###  id

• **id**: *number*

*Defined in [interfaces/migrate.interfaces.ts:19](https://github.com/kriasoft/node-sqlite/blob/16a8dec/src/interfaces/migrate.interfaces.ts#L19)*

###  name

• **name**: *string*

*Defined in [interfaces/migrate.interfaces.ts:20](https://github.com/kriasoft/node-sqlite/blob/16a8dec/src/interfaces/migrate.interfaces.ts#L20)*

### `Optional` up

• **up**? : *string*

*Defined in [interfaces/migrate.interfaces.ts:22](https://github.com/kriasoft/node-sqlite/blob/16a8dec/src/interfaces/migrate.interfaces.ts#L22)*

###  MigrationParams

• **MigrationParams**:

*Defined in [interfaces/migrate.interfaces.ts:2](https://github.com/kriasoft/node-sqlite/blob/16a8dec/src/interfaces/migrate.interfaces.ts#L2)*

### `Optional` force

• **force**? : *boolean*

*Defined in [interfaces/migrate.interfaces.ts:7](https://github.com/kriasoft/node-sqlite/blob/16a8dec/src/interfaces/migrate.interfaces.ts#L7)*

If true, will force the migration API to rollback and re-apply the latest migration over
again each time when Node.js app launches.

### `Optional` migrationsPath

• **migrationsPath**? : *string*

*Defined in [interfaces/migrate.interfaces.ts:15](https://github.com/kriasoft/node-sqlite/blob/16a8dec/src/interfaces/migrate.interfaces.ts#L15)*

Path to the migrations folder. Default is `path.join(process.cwd(), 'migrations')`

### `Optional` table

• **table**? : *string*

*Defined in [interfaces/migrate.interfaces.ts:11](https://github.com/kriasoft/node-sqlite/blob/16a8dec/src/interfaces/migrate.interfaces.ts#L11)*

Migrations table name. Default is 'migrations'
