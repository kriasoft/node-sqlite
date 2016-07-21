/**
 * SQLite client library for Node.js applications
 *
 * Copyright © 2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

class Statement {

  constructor(stmt, Promise) {
    this.stmt = stmt;
    this.Promise = Promise;
  }

  bind(...params) {
    return new this.Promise((resolve, reject) => {
      this.stmt.bind(...params, err => {
        if (err) {
          reject(err);
        } else {
          resolve(this);
        }
      });
    });
  }

  reset() {
    return new this.Promise(resolve => {
      this.stmt.reset(() => {
        resolve(this);
      });
    });
  }

  finalize() {
    return new this.Promise((resolve, reject) => {
      this.stmt.finalize(err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  run(...params) {
    return new this.Promise((resolve, reject) => {
      this.stmt.run(...params, function runExecResult(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this);
        }
      });
    });
  }

  get(...params) {
    return new this.Promise((resolve, reject) => {
      this.stmt.get(...params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  all(...params) {
    return new this.Promise((resolve, reject) => {
      this.stmt.all(...params, err => {
        if (err) {
          reject(err);
        } else {
          resolve(this);
        }
      });
    });
  }

  each(...params) {
    return new this.Promise((resolve, reject) => {
      const callback = params.pop();
      this.stmt.each(...params, callback, (err, rowsCount = 0) => {
        if (err) {
          reject(err);
        } else {
          resolve(rowsCount);
        }
      });
    });
  }

}

export default Statement;
