/**
 * SQLite client library for Node.js applications
 *
 * Copyright © 2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

const db = require('../build/main');
const expect = require('chai').expect;

it('Should open a database connection', (done) => {
  let p = Promise.resolve();
  p = p.then(() => db.open(':memory:'));
  p = p.then(() => db.exec('CREATE TABLE tbl (col TEXT)'));
  p = p.then(() => db.exec('INSERT INTO tbl VALUES ("test")'));
  p = p.then(() => db.get('SELECT col FROM tbl'));
  p = p.then(result => {
    expect(result).to.be.deep.equal({ col: 'test' });
  });
  p = p.then(() => db.all('SELECT col FROM tbl'));
  p = p.then(result => {
    expect(result).to.be.deep.equal([{ col: 'test' }]);
  });
  p = p.then(() => db.all('SELECT * FROM tbl WHERE col = ?', 'test'));
  p = p.then(result => {
    expect(result).to.have.length(1);
  });
  p = p.then(() => db.run('UPDATE tbl SET col = ? WHERE col = ?', 'foo', 'test'));
  p = p.then(() => db.get('SELECT col FROM tbl').then(result => {
    expect(result).to.be.deep.equal({ col: 'foo' });
  }));
  p = p.then(() => db.close());
  p.then(done, done);
});
