# JENS Shoe Store

Full stack application used to store shoes. Built with SQL, Express, jQuery and Node.js.

## PG

- `npm install pg`

## Base Mode

Add a delete button to the DOM for each item. Make an AJAX request and complete the delete route on the server. Click the button to delete that item from the Database, then refresh the DOM.

## Stretch Goal

Ability to update a shoe cost with a put route. (We'll learn this next!)

## SQL Queries

Database name : `shoe_store`

### CREATE TABLE

```SQL
CREATE TABLE "shoes" (
  "id" serial primary key,
  "name" varchar(120),
  "cost" float,
  "size" float
);
```

### INSERT INTO

```SQL
INSERT INTO "shoes" ("name", "cost", "size") 
VALUES ('Nike', 79.99, 8);
```

### SELECT

```SQL
SELECT * FROM "shoes" LIMIT 20;
```
