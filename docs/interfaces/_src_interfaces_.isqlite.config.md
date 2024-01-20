[sqlite](../README.md) › [Globals](../globals.md) › ["src/interfaces"](../modules/_src_interfaces_.md) › [ISqlite](../modules/_src_interfaces_.isqlite.md) › [Config](_src_interfaces_.isqlite.config.md)

# Interface: Config

## Hierarchy

- **Config**

## Index

### Properties

- [driver](_src_interfaces_.isqlite.config.md#driver)
- [filename](_src_interfaces_.isqlite.config.md#filename)
- [mode](_src_interfaces_.isqlite.config.md#optional-mode)

## Properties

### driver

• **driver**: _any_

_Defined in [src/interfaces.ts:48](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/interfaces.ts#L48)_

The database driver. Most will install `sqlite3` and use the `Database` class from it.
As long as the library you are using conforms to the `sqlite3` API, you can use it as
the driver.

**`example`**

```
import sqlite from 'sqlite3'

const driver = sqlite.Database
```

---

### filename

• **filename**: _string_

_Defined in [src/interfaces.ts:27](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/interfaces.ts#L27)_

Valid values are filenames, ":memory:" for an anonymous in-memory
database and an empty string for an anonymous disk-based database.
Anonymous databases are not persisted and when closing the database
handle, their contents are lost.

---

### `Optional` mode

• **mode**? : _number_

_Defined in [src/interfaces.ts:33](https://github.com/kriasoft/node-sqlite/blob/d15b22e/src/interfaces.ts#L33)_

One or more of sqlite3.OPEN_READONLY, sqlite3.OPEN_READWRITE and
sqlite3.OPEN_CREATE. The default value is OPEN_READWRITE | OPEN_CREATE.
