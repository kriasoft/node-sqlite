/**
 * SQLite client library for Node.js applications
 *
 * Copyright © 2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import sqlite3 from 'sqlite3';

let db;
let Promise = global.Promise;

function open(filename, options = {}) {
  if (options.Promise) {
    Promise = options.Promise;
  }

  if (options.verbose) {
    sqlite3.verbose();
  }

  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(filename, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function close() {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function run(sql, ...params) {
  return new Promise((resolve, reject) => {
    db.run(sql, params || [], function cb(err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
}

function get(sql, ...params) {
  return new Promise((resolve, reject) => {
    db.get(sql, params || [], function cb(err, row) {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

function all(sql, ...params) {
  return new Promise((resolve, reject) => {
    db.all(sql, params || [], function cb(err, rows) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function each(sql, ...params) {
  const cb = params.pop();
  return new Promise((resolve) => {
    db.each(sql, params, cb, resolve);
  });
}

function exec(sql) {
  return new Promise((resolve, reject) => {
    db.exec(sql, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function prepare(sql, ...params) {
  return new Promise((resolve, reject) => {
    const statement = db.prepare(sql, ...params, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(statement);
      }
    });
  });
}

/* eslint-disable object-shorthand */
export default { get: get, open, close, run, all, each, exec, prepare };
/* eslint-enable object-shorthand */
