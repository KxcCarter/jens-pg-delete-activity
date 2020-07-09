const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// Express removed the '/shoes' when we do a app.use
router.post('/', function(req, res) {
    const shoeToAdd = req.body; // This the data we sent
    console.log('In POST route - product:', shoeToAdd); // Has a name, size and cost
    const query =
        'INSERT INTO "shoes" ("name", "cost", "size") VALUES ($1, $2, $3);';
    // $ with index (e.g. $1) will help improve the security of your db
    // Avoids SQL injection -- see bobby drop table comic
    pool
        .query(query, [shoeToAdd.name, shoeToAdd.cost, shoeToAdd.size])
        .then(() => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('Error in POST', error);
            res.sendStatus(500);
        });
});

// http://localhost:5002/shoes will go here
router.get('/', function(req, res) {
    console.log('In GET route');
    // The query we want to run
    const query = 'SELECT * FROM "shoes";';
    pool
        .query(query)
        .then((results) => {
            console.log(results); // This is an object
            res.send(results.rows); // result.rows is an Array of shoes
        })
        .catch((error) => {
            console.log('Error making GET', error);
            res.sendStatus(500);
        });
}); // END GET ROUTE

// PUT ROUTE
router.put('/:id', (req, res) => {
    console.log(`in PUT route`);
});

// DELETE ROUTE
router.delete('/:id', (req, res) => {
    console.log(`In DELETE route`);
    const id = req.params.id;
    const query = `DELETE FROM "shoes" WHERE "id" = $1;`;

    pool
        .query(query, [id])
        .then((dbRes) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log(err);
            sendStatus(500);
        });
});

module.exports = router;