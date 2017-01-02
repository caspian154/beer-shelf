'use strict';

var express = require('express');
var router = express.Router();

var Beer = require('../models/beer')
var Beers = require('../models/beers')
var Parser = require('./external-lookup/BeerAdvocateParser')

router.route('/beers/:beer_id')
  .get(function (req, res) {
    Beer.where('id', req.params.beer_id)
    .fetch({withRelated: ['brewery']})
    .then (function (beer) {
      if (beer) {
        res.json(beer.toJSON())
      }
      else {
        res.status(500).json({error: true, data: {message: 'Unabled to find beer'}});
      }
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    })
  })

router.route('/beers')
  // fetch all users
  .get(function (req, res) {
    Beers.forge()
    .fetch({withRelated: ['brewery']})
    .then(function (collection) {
      res.json(collection.toJSON());
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    })
  })
  // create a brewery
  .post(function (req, res) {
    Beer.forge({
      name: req.body.name,
      beer_advocate_id: req.body.beer_advocate_id
    })
    .save()
    .then(function (brewery) {
      res.json({error: false, data: {id: brewery.get('id')}})
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}})
    })
  })

router.route('/external-beers/:brewery_id')
  .get(function (req, res) {
    Parser.lookupBeers(req.params.brewery_id,
      function(beers) {
        res.json({error: false, data: beers})
      },
      function(errorMessage) {
        res.status(500).json({error: true, data: {message: errorMessage}})
      })
  })

module.exports = router;
