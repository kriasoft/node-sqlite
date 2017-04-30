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
  let p = db.open(':memory:');
  p = p.then(() => db.exec('CREATE TABLE tbl (col TEXT)'));
  p = p.then(() => db.exec('INSERT INTO tbl VALUES ("test")'));
  p = p.then(() => db.get('SELECT col FROM tbl').then((result) => {
    expect(result).to.be.deep.equal({ col: 'test' });
  }));
  p = p.then(() => db.all('SELECT col FROM tbl').then((result) => {
    expect(result).to.be.deep.equal([{ col: 'test' }]);
  }));
  p = p.then(() => db.all('SELECT * FROM tbl WHERE col = ?', 'test').then((result) => {
    expect(result).to.have.length(1);
  }));
  p = p.then(() => db.run('UPDATE tbl SET col = ? WHERE col = ?', 'foo', 'test')).then((stmt) => {
    // Cannot use deep equals because stmt is a Statement instance
    expect(stmt.lastID).to.equal(1);
    expect(stmt.changes).to.equal(1);
    expect(stmt.sql).to.equal('UPDATE tbl SET col = ? WHERE col = ?');
  });
  p = p.then(() => db.get('SELECT col FROM tbl').then((result) => {
    expect(result).to.be.deep.equal({ col: 'foo' });
  }));
  p = p.then(() => db.close());
  p.then(done, done);
});

it('Should allow named parameters to be used', (done) => {
  let p = db.open(':memory:');
  p = p.then(() => db.exec('CREATE TABLE tbl (col TEXT)'));
  p = p.then(() => db.run('INSERT INTO tbl(col) VALUES (:col)', { ':col': 'something' })
    .then((stmt) => {
      expect(stmt.lastID).to.equal(1);
    }));
  p = p.then(() => db.get('SELECT col FROM tbl WHERE 1 = ? AND 5 = ?5', { 1: 1, 5: 5 })
    .then((result) => {
      expect(result).to.be.deep.equal({ col: 'something' });
    }));
  p = p.then(() => db.run('INSERT INTO tbl(col) VALUES ($col)', { $col: 'other thing' })
    .then((stmt) => {
      expect(stmt.lastID).to.equal(2);
    }));
  p = p.then(() => db.each('SELECT col FROM tbl WHERE ROWID = ?', [2], (err, result) => {
    expect(result).to.be.deep.equal({ col: 'other thing' });
  }).then((rowsCount) => {
    expect(rowsCount).to.equal(1);
  }));
  p = p.then(() => db.all('SELECT col FROM tbl WHERE 13 = @thirteen ORDER BY col DESC', {
    '@thirteen': 13,
  }).then((results) => {
    expect(results).to.be.deep.equal([{ col: 'something' }, { col: 'other thing' }]);
  }));
  p = p.then(() => db.close());
  p.then(done, done);
});

it('Should allow named parameters to be used with prepared statements', (done) => {
  let p = db.open(':memory:');
  p = p.then(() => db.exec('CREATE TABLE tbl (col TEXT)'));
  p = p.then(() => db.prepare('INSERT INTO tbl(col) VALUES (:col)', { ':col': 'some text' })
    .then(stmt => stmt.run())
    .then((stmt) => {
      expect(stmt.lastID).to.equal(1);
      return stmt.finalize();
    }));
  p = p.then(() => db.prepare('SELECT col FROM tbl WHERE 1 = ? AND 5 = ?5')
    .then(stmt => stmt.bind({ 1: 1, 5: 5 }))
    .then(stmt => stmt.get()
      .then((result) => {
        expect(result).to.be.deep.equal({ col: 'some text' });
        return stmt.finalize();
      })));
  p = p.then(() => db.prepare('INSERT INTO tbl(col) VALUES ($col)')
    .then(stmt => stmt.run({ $col: 'other text' }))
    .then((stmt) => {
      expect(stmt.lastID).to.equal(2);
      return stmt.finalize();
    }));
  p = p.then(() => db.prepare('SELECT col FROM tbl WHERE ROWID = ?')
    .then(stmt => stmt.each([2], (err, result) => {
      expect(result).to.be.deep.equal({ col: 'other text' });
    }).then((rowsCount) => {
      expect(rowsCount).to.equal(1);
      return stmt.finalize();
    })));
  p = p.then(() => db.prepare('SELECT col FROM tbl WHERE 13 = @thirteen ORDER BY col DESC')
    .then(stmt => stmt.all({ '@thirteen': 13 })
      .then((results) => {
        expect(results).to.be.deep.equal([{ col: 'some text' }, { col: 'other text' }]);
        return stmt.finalize();
      })));
  p = p.then(() => db.close());
  p.then(done, done);
});

it('Should allow chaining Statement.run() calls', (done) => {
  let p = db.open(':memory:');
  p = p.then(() => db.exec('CREATE TABLE tbl (col1 TEXT, col2 TEXT, col3 TEXT)'));
  p = p.then(() => db.prepare('INSERT INTO tbl(col1, col2, col3) VALUES (?, ?, ?)')
    .then(stmt => stmt.run('a1', 'a2', 'a3')).then((stmt) => {
      expect(stmt.lastID).to.equal(1);
      return stmt.run('b1', 'b2', 'b3');
    })
    .then((stmt) => {
      expect(stmt.lastID).to.equal(2);
      return stmt.finalize();
    }));
  p = p.then(() => db.all('SELECT col1, col2, col3 FROM tbl').then((results) => {
    expect(results).to.be.deep.equal([{
      col1: 'a1',
      col2: 'a2',
      col3: 'a3',
    }, {
      col1: 'b1',
      col2: 'b2',
      col3: 'b3',
    }]);
  }));
  p = p.then(() => db.close());
  p.then(done, done);
});

it('Should handle BLOBs', (done) => {
  const buf = Buffer.from('SGVsbG8gd29ybGQh', 'base64');
  let p = db.open(':memory:');
  p = p.then(() => db.exec('CREATE TABLE dat (b BLOB)'));
  p = p.then(() => db.run('INSERT INTO dat(b) VALUES(?)', buf).then((stmt) => {
    expect(stmt.lastID).to.equal(1);
  }));
  p = p.then(() => db.get('SELECT b FROM dat').then((result) => {
    expect(result.b).to.be.instanceof(Buffer);
    expect(result.b.toString('utf8')).to.equal('Hello world!');
  }));
  p.then(done, done);
});

it('Should migrate the database', (done) => {
  let p = db.open(':memory:');
  p = p.then(() => db.migrate());
  p = p.then(() => db.all('SELECT id, name FROM migrations').then((result) => {
    expect(result).to.be.deep.equal([{ id: 1, name: 'initial' }, { id: 2, name: 'some-feature' }, { id: 3, name: 'test-cert' }]);
  }));
  p = p.then(() => db.all('SELECT * FROM Category').then((result) => {
    expect(result).to.be.deep.equal([{ id: 1, name: 'Test' }]);
  }));

  p = p.then(() => db.all('SELECT certificate from whatever').then((result) => {
    expect(result[0].certificate).to.be.equal('-----BEGIN CERTIFICATE-----\nsome contents\n-----END CERTIFICATE-----');
  }));

  p = p.then(() => db.close());
  p.then(done, done);
});
