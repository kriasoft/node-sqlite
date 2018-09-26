/**
 * SQLite client library for Node.js applications
 *
 * Copyright © 2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { prepareParams } from './utils';

class Statement {

  constructor(stmt, Promise) {
    this.stmt = stmt;
    this.Promise = Promise;
  }

  get sql() {
    return this.stmt.sql;
  }

  get lastID() {
    return this.stmt.lastID;
  }

  get changes() {
    return this.stmt.changes;
  }

  bind() {
    const params = prepareParams(arguments);
    return new this.Promise((resolve, reject) => {
      this.stmt.bind(params, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(this);
        }
      });
    });
  }

  reset() {
    return new this.Promise((resolve) => {
      this.stmt.reset(() => {
        resolve(this);
      });
    });
  }

  finalize() {
    return new this.Promise((resolve, reject) => {
      this.stmt.finalize((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  run() {
    const params = prepareParams(arguments);
    return new this.Promise((resolve, reject) => {
      this.stmt.run(params, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(this);
        }
      });
    });
  }

  get() {
    const params = prepareParams(arguments);
    return new this.Promise((resolve, reject) => {
      this.stmt.get(params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  all() {
    const params = prepareParams(arguments);
    return new this.Promise((resolve, reject) => {
      this.stmt.all(params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  each() {
    const params = prepareParams(arguments, { excludeLastArg: true });
    const callback = arguments[arguments.length - 1];
    return new this.Promise((resolve, reject) => {
      this.stmt.each(params, callback, (err, rowsCount = 0) => {
        if (err) {
          reject(err);
        } else {
          resolve(rowsCount);
        }
      });
    });
  }

  iterate = function* (params){
    if(params){
      this.bind(params)
    }
    while(true){
      const value = this.get()
      if(value===undefined){
        break
      }
      yield value
    }
  }

}

export default Statement;
