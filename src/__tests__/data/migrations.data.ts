export const initial001 = {
  up: `CREATE TABLE Category (
  id   INTEGER PRIMARY KEY,
  name TEXT    NOT NULL
);

CREATE TABLE Post (
  id          INTEGER PRIMARY KEY,
  categoryId  INTEGER NOT NULL,
  title       TEXT    NOT NULL,
  isPublished NUMERIC NOT NULL DEFAULT 0,
  CONSTRAINT Post_fk_categoryId FOREIGN KEY (categoryId)
    REFERENCES Category (id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT Post_ck_isPublished CHECK (isPublished IN (0, 1))
);

CREATE INDEX Post_ix_categoryId ON Post (categoryId);

INSERT INTO Category (id, name) VALUES (1, 'Test');`,
  down: `DROP INDEX Post_ix_categoryId;
DROP TABLE Post;
DROP TABLE Category;`
}

export const someFeature002 = {
  up: `CREATE TABLE Test (
  id   INTEGER PRIMARY KEY,
  name TEXT    NOT NULL
);`,
  down: `DROP TABLE Test;`
}

export const testCert003 = {
  up: `CREATE TABLE whatever ( certificate TEXT );
INSERT INTO whatever ( certificate ) VALUES (
  '-----BEGIN CERTIFICATE-----
some contents
-----END CERTIFICATE-----');`,
  down: `DROP TABLE whatever;`
}

export const noDown004 = {
  up: `CREATE TABLE IF NOT EXISTS downless ( value TEXT );
INSERT INTO downless ( value ) VALUES ('down migration is optional');`
}
