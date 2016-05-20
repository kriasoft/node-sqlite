--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE Category (
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

INSERT INTO Category (id, name) VALUES (1, 'Test');

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP INDEX IF EXISTS Post_ix_categoryId;
DROP CONSTRAINT IF EXISTS Post_ck_isPublished;
DROP CONSTRAINT IF EXISTS Post_fk_categoryId;
DROP TABLE IF EXISTS Post;
DROP TABLE IF EXISTS Category;
