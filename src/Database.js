/**
 * SQLite client library for Node.js applications
 *
 * Copyright © 2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import fs from 'fs';
import path from 'path';
import Statement from './Statement';

class Database {

  /**
   * Initializes a new instance of the database client.
   * @param driver An instance of SQLite3 driver library.
   * @param promiseLibrary ES6 Promise library to use.
     */
  constructor(driver, { Promise }) {
    this.driver = driver;
    this.Promise = Promise;
  }

  /**
   * Close the database.
   */
  close() {
    return new this.Promise((resolve, reject) => {
      this.driver.close(err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  run(sql) {
    const params = (arguments.length === 2 && typeof arguments[1] === 'object'
                    ? arguments[1]
                    : Array.prototype.slice.call(arguments, 1));
    const Promise = this.Promise;
    return new Promise((resolve, reject) => {
      this.driver.run(sql, params, function runExecResult(err) {
        if (err) {
          reject(err);
        } else {
          // Per https://github.com/mapbox/node-sqlite3/wiki/API#databaserunsql-param--callback
          // when run() succeeds, the `this' object is a driver statement object. Wrap it as a
          // Statement.
          resolve(new Statement(this, Promise));
        }
      });
    });
  }

  get(sql) {
    const params = (arguments.length === 2 && typeof arguments[1] === 'object'
                    ? arguments[1]
                    : Array.prototype.slice.call(arguments, 1));
    return new this.Promise((resolve, reject) => {
      this.driver.get(sql, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  all(sql) {
    const params = (arguments.length === 2 && typeof arguments[1] === 'object'
                    ? arguments[1]
                    : Array.prototype.slice.call(arguments, 1));
    return new this.Promise((resolve, reject) => {
      this.driver.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  /**
   * Runs all the SQL queries in the supplied string. No result rows are retrieved.
   */
  exec(sql) {
    return new this.Promise((resolve, reject) => {
      this.driver.exec(sql, err => {
        if (err) {
          reject(err);
        } else {
          resolve(this);
        }
      });
    });
  }

  each(sql) {
    const params = (arguments.length === 3 && typeof arguments[1] === 'object'
                    ? arguments[1]
                    : Array.prototype.slice.call(arguments, 1, arguments.length - 1));
    const callback = arguments[arguments.length - 1];
    return new this.Promise((resolve) => {
      this.driver.each(sql, params, callback, (err, rowsCount = 0) => {
        if (err) {
          reject(err);
        } else {
          resolve(rowsCount);
        }
      });
    });
  }

  prepare(sql) {
    const params = (arguments.length === 2 && typeof arguments[1] === 'object'
                    ? arguments[1]
                    : Array.prototype.slice.call(arguments, 1));
    return new this.Promise((resolve, reject) => {
      const stmt = this.driver.prepare(sql, params, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(new Statement(stmt, this.Promise));
        }
      });
    });
  }

  /**
   * Migrates database schema to the latest version
   */
  async migrate({ force, table = 'migrations', migrationsPath = './migrations' } = {}) {
    const location = path.resolve(migrationsPath);

    // Get the list of migration files, for example:
    //   { id: 1, name: 'initial', filename: '001-initial.sql' }
    //   { id: 2, name: 'feature', fielname: '002-feature.sql' }
    const migrations = await new this.Promise((resolve, reject) => {
      fs.readdir(location, (err, files) => {
        if (err) {
          reject(err);
        } else {
          resolve(files
            .map(x => x.match(/^(\d+).(.*?)\.sql$/))
            .filter(x => x !== null)
            .map(x => ({ id: Number(x[1]), name: x[2], filename: x[0] }))
            .sort((a, b) => a.id > b.id));
        }
      });
    });

    if (!migrations.length) {
      throw new Error(`No migration files found in '${location}'.`);
    }

    // Ge the list of migrations, for example:
    //   { id: 1, name: 'initial', filename: '001-initial.sql', up: ..., down: ... }
    //   { id: 2, name: 'feature', fielname: '002-feature.sql', up: ..., down: ... }
    await Promise.all(migrations.map(migration => new this.Promise((resolve, reject) => {
      const filename = path.join(location, migration.filename);
      fs.readFile(filename, 'utf-8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          const [up, down] = data.split(/^\-\-\s+?down/mi);
          if (!down) {
            const message = `The ${migration.filename} file does not contain '-- Down' separator.`;
            reject(new Error(message));
          } else {
            /* eslint-disable no-param-reassign */
            migration.up = up.replace(/^\-\-.*?$/gm, '').trim();     // Remove comments
            migration.down = down.replace(/^\-\-.*?$/gm, '').trim(); // and trim whitespaces
            /* eslint-enable no-param-reassign */
            resolve();
          }
        }
      });
    })));

    // Create a database table for migrations meta data if it doesn't exist
    await this.run(`CREATE TABLE IF NOT EXISTS "${table}" (
  id   INTEGER PRIMARY KEY,
  name TEXT    NOT NULL,
  up   TEXT    NOT NULL,
  down TEXT    NOT NULL
)`);

    // Get the list of already applied migrations
    let dbMigrations = await this.all(
      `SELECT id, name, up, down FROM "${table}" ORDER BY id DESC`
    );

    // Undo migrations that exist only in the database but not in files,
    // also undo the last migration if the `force` option was set to `last`.
    const lastMigration = migrations[migrations.length - 1];
    for (const migration of dbMigrations.slice().sort((a, b) => a.id < b.id)) {
      if (!migrations.some(x => x.id === migration.id) ||
        (force === 'last' && migration.id === lastMigration.id)) {
        await this.run('BEGIN');
        try {
          await this.exec(migration.down);
          await this.run(`DELETE FROM "${table}" WHERE id = ?`, migration.id);
          await this.run('COMMIT');
          dbMigrations = dbMigrations.filter(x => x.id !== migration.id);
        } catch (err) {
          await this.run('ROLLBACK');
          throw err;
        }
      } else {
        break;
      }
    }

    // Apply pending migrations
    const lastMigrationId = dbMigrations.length ? dbMigrations[dbMigrations.length - 1].id : 0;
    for (const migration of migrations) {
      if (migration.id > lastMigrationId) {
        await this.run('BEGIN');
        try {
          await this.exec(migration.up);
          await this.run(
            `INSERT INTO "${table}" (id, name, up, down) VALUES (?, ?, ?, ?)`,
            migration.id, migration.name, migration.up, migration.down
          );
          await this.run('COMMIT');
        } catch (err) {
          await this.run('ROLLBACK');
          throw err;
        }
      }
    }

    return this;
  }
}

export default Database;
