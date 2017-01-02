'use strict';

var express = require('express');
var router = express.Router();

var Beer = require('../models/beer')
var Brewery = require('../models/brewery')
var Breweries = require('../models/breweries')
var Parser = require('./external-lookup/BeerAdvocateParser')

router.route('/breweries/:brewery_id')
  .get(function (req, res) {
    Brewery.where('id', req.params.brewery_id).fetch()
    .then (function (brewery) {
      if (brewery) {
        res.json(brewery.toJSON())
      }
      else {
        res.status(500).json({error: true, data: {message: 'Unabled to find brewery'}});
      }
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    })
  })

router.route('/breweries')
  // fetch all users
  .get(function (req, res) {
    Breweries.forge()
    .fetch()
    .then(function (collection) {
      res.json(collection.toJSON());
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    })
  })
  // create a brewery
  .post(function (req, res) {
    Brewery.forge({
      name: req.body.name,
      beer_advocate_id: req.body.beer_advocate_id
    })
    .save()
    .then(function (brewery) {
      // is there a better place to do this?
      // add all the beers for this brewery
      Parser.lookupBeers(brewery.get('beer_advocate_id'),
        function(beers) {
          if (beers) {
            beers.forEach(function(item) {
              Beer.forge({
                name: item.name,
                beer_advocate_id: item.beer_advocate_id,
                abv: item.abv,
                style: item.style,
                brewery_id: brewery.get('id')
              }).save()
              // don't really care if they fail?
            })
          }
        },
        function(errorMessage) {
          console.error('Something went wrong adding beers' + errorMessage);
        })

      res.json({error: false, data: {id: brewery.get('id')}})
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}})
    })
  })

router.route('/external-breweries/:text')
  .get(function (req, res) {
    Parser.lookupBreweries(req.params.text,
      function(breweries) {
        res.json({error: false, data: breweries})
      },
      function(errorMessage) {
        res.status(500).json({error: true, data: {message: errorMessage}})
      })
  })

module.exports = router;
