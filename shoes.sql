
-- DB NAME: shoe_store

CREATE TABLE "shoes" (
  "id" serial primary key,
  "name" varchar(120),
  "cost" float,
  "size" float
);


-- INSERT INTO

INSERT INTO "shoes" ("name", "cost", "size") 
VALUES ('Nike', 79.99, 8);
-- SELECT


SELECT * FROM "shoes" LIMIT 20;
