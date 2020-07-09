// Variables
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5002;
const bodyParser = require('body-parser');
const shoeRouter = require('./routes/shoe.router.js');

// Configure body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); // This line is required for Angular

// Setup routes
app.use('/shoes', shoeRouter);

// Static files
app.use(express.static('server/public'));

// Start the server
app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});
