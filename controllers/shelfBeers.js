'use strict';

var express = require('express');
var router = express.Router();

var Beer = require('../models/beer')
var ShelfBeer = require('../models/shelfBeer')
var ShelfBeers = require('../models/shelfBeers')
var Parser = require('./external-lookup/BeerAdvocateParser')

router.route('/shelf-beers/:user_id')
  .get(function (req, res) {
    ShelfBeer.where('user_id', req.params.user_id)
    .fetchAll({withRelated: ['beer', 'beer.brewery', 'user']})
    .then (function (shelfBeers) {
      if (shelfBeers) {
        res.json(shelfBeers.toJSON())
      }
      else {
        res.status(500).json({error: true, data: {message: 'Unabled to find beers'}});
      }
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    })
  })

router.route('/shelf-beers')
  // fetch all shelf-beers
  .get(function (req, res) {
    ShelfBeers.forge()
    .fetch({withRelated: ['beer', 'user']})
    .then(function (collection) {
      res.json(collection.toJSON());
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    })
  })
  // create a shelf beer
  .post(function (req, res) {
    ShelfBeer.forge({
      user_id: req.body.user_id,
      beer_id: req.body.beer_id,
      quantity: req.body.quantity,
      size: req.body.size,
      vintage: req.body.vintage
    })
    .save()
    .then(function (shelfBeer) {
      res.json({error: false, data: {id: shelfBeer.get('id')}})
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}})
    })
  })

module.exports = router;
