'use strict';

var express = require('express');
var app = express();
var router = express.Router();

var bodyParser = require('body-parser');
// body-parser middleware for handling request variables
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// binding express app to port 3000
app.listen(3000, function() {
  console.log('Node server running @ http://localhost:3000')
});

// get the node modules and css
app.use('/node_modules',  express.static(__dirname + '/node_modules'));
app.use('/styles',  express.static(__dirname + '/styles'));

// import the routes
app.use(require('./controllers'))

// load the database stuff
let bookshelf = require('./database');

var User = require('./models/user')
var Users = require('./models/users')

/*
router.route('/users')
  // fetch all users
  .get(function (req, res) {
    console.log('get users!');
    Users.forge()
    .fetch()
    .then(function (collection) {
      res.json({error: false, data: collection.toJSON()});
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    })
  })
  // create a user
  .post(function (req, res) {
    console.log('create user');
    console.log('  user: '+ req.body);
    console.log('  user: '+ req.body.name);
    User.forge({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    .save()
    .then(function (user) {
      res.json({error: false, data: {id: user.get('id')}});
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  });
*/
app.use('/api', router);
