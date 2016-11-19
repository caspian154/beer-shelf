'use strict';

var express = require('express');
var router = express.Router();

var Brewery = require('../models/brewery')
var Breweries = require('../models/breweries')

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
      res.json({error: false, data: {id: brewery.get('id')}})
    })
    .otherwise(function (err) {
      res.status(500).json({error: true, data: {message: err.message}})
    })
  })

module.exports = router;
