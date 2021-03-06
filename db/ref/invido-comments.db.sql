BEGIN TRANSACTION;
DROP TABLE IF EXISTS "post";
CREATE TABLE IF NOT EXISTS "post" (
	"id"	INTEGER NOT NULL,
	"title"	TEXT,
	"link"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);
DROP TABLE IF EXISTS "comment";
CREATE TABLE IF NOT EXISTS "comment" (
	"id"	INTEGER NOT NULL,
	"post_id"	INTEGER NOT NULL,
	"parent_id"	INTEGER,
	"name"	TEXT,
	"email"	TEXT,
	"content"	TEXT,
	"timestamp"	INTEGER,
	"published"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT)
);
COMMIT;
