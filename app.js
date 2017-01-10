'use strict';

var dbinit = require('./database/init')
dbinit();
var express = require('express');
var app = express();
var router = express.Router();

var bodyParser = require('body-parser');
// body-parser middleware for handling request variables
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('superSecret', "secret phrase for this beer")

// binding express app to port 3000
app.listen(3000, function() {
  console.log('Node server running @ http://localhost:3000')
});

// get the node modules and css
app.use('/node_modules',  express.static(__dirname + '/node_modules'));
app.use('/styles',  express.static(__dirname + '/styles'));

// import the routes
app.use(require('./controllers'))
