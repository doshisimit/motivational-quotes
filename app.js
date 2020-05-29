const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

const quotesRoute = require('./routes/quotes');
app.use(bodyParser.json());
app.use('/quotes', quotesRoute);


app.use('/', (req, res) => {
    res.send("This is a Private Server");
});



mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

db.once('open', function () {
    console.log('Connected to DB');
});

app.listen(3000);