'use strict';

var express = require('express');
var router = express.Router();

var Beer = require('../models/beer')
var ShelfBeer = require('../models/shelfBeer')
var ShelfBeerAttribute = require('../models/shelfBeerAttribute')
var ShelfBeerAttributes = require('../models/shelfBeerAttributes')
var ShelfAttributeType = require('../models/shelfAttributeType')

var ShelfBeerUtil = require('../models/util/shelfBeerUtil')
var Parser = require('./external-lookup/BeerAdvocateParser')

router.route('/shelf-beers/:user_id')
  .get(function (req, res) {
    ShelfBeer.where('user_id', req.params.user_id)
    .fetchAll({withRelated: ['beer', 'beer.brewery', 'user', 
        'beerAttributes', 'beerAttributes.attributeType']})
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

router.route('/shelf-attribute-types')
  // fetch all shelf-beers
  .get(function (req, res) {
    ShelfAttributeType.forge()
    .fetchAll({withRelated: ['dataType']})
    .then(function (collection) {
      res.json(collection.toJSON());
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
    ShelfBeerUtil.saveShelfBeer(req.body)
      .then(function (shelfBeer) {
        if (shelfBeer) {
          res.json({error: false, data: {id: shelfBeer.get('id')}})
        }
        else {
          res.status(500).json({erorr: true, data: { message: 'Unable to create new object.'}})
        }
      })
      .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}})
      })
  })
  .put(function (req, res) {
    ShelfBeerUtil.saveShelfBeer(req.body)
      .then(function (shelfBeer) {
        if (shelfBeer) {
          res.json({error: false, data: {id: shelfBeer.get('id')}})
        }
        else {
          res.status(500).json({erorr: true, data: { message: 'Unable to create new object.'}})
        }
      })
      .catch(function (err) {
        console.error('something went wrong ' + err)
        res.status(500).json({error: true, data: {message: err.message}})
      });
  })

module.exports = router;
