'use strict';

var express = require('express');
var router = express.Router();

var User = require('../models/user')
var Users = require('../models/users')

router.route('/users')
  // fetch all users
  .get(function (req, res) {
    Users.forge()
    .fetch({
      columns: ['id', 'email', 'name']
    })
    .then(function (collection) {
      console.log('get users');
      //res.json({error: false, data: collection.toJSON()});
      res.json(collection.toJSON());
      //res.json(req.decoded)
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    })
  })
  // create a user
  .post(function (req, res) {
    console.log('create user: '+ req.body.name);
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

module.exports = router;
