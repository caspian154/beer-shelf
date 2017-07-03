'use strict'

var express = require('express')
var router = express.Router()

var ShelfBeer = require('../models/shelfBeer')
var ShelfAttributeType = require('../models/shelfAttributeType')

var ShelfBeerUtil = require('../models/util/shelfBeerUtil')

router.route('/shelf-beers/user/:user_id')
  .get(function (req, res) {
    ShelfBeer.where('user_id', req.params.user_id)
      .fetchAll({
        withRelated: ['beer', 'beer.brewery', 'user',
          'beerAttributes', 'beerAttributes.attributeType']
      })
      .then(function (shelfBeers) {
        if (shelfBeers) {
          res.json(shelfBeers.toJSON())
        } else {
          res.status(500).json({ error: true, data: { message: 'Unabled to find beers' } })
        }
      })
      .catch(function (err) {
        res.status(500).json({ error: true, data: { message: err.message } })
      })
  })
router.route('/shelf-beers/user/:user_id/export')
  .get(function (req, res) {
    ShelfBeer.where('user_id', req.params.user_id)
      .fetchAll({
        withRelated: ['beer', 'beer.brewery', 'user',
          'beerAttributes', 'beerAttributes.attributeType']
      })
      .then(function (shelfBeers) {
        if (shelfBeers) {
          res.setHeader('Content-disposition', 'attachment; filename=beer-shelf.csv')
          res.set('Content-Type', 'text/csv')
          res.status(200).send(ShelfBeerUtil.convertToCSV(shelfBeers))
        } else {
          res.status(500).send('Unabled to find beers')
        }
      })
      .catch(function (err) {
        res.status(500).send(err.message)
      })
  })

router.route('/shelf-attribute-types')
  // fetch all attribute types
  .get(function (req, res) {
    ShelfAttributeType.forge()
      .fetchAll({ withRelated: ['dataType'] })
      .then(function (collection) {
        res.json(collection.toJSON())
      })
      .catch(function (err) {
        res.status(500).json({ error: true, data: { message: err.message } })
      })
  })
  // create a new attribute type
  .post(function (req, res) {
    ShelfAttributeType.forge({
      name: req.body.name,
      attribute_data_type_id: req.body.attribute_data_type_id
    })
      .save()
      .then(function (attributeType) {
        res.json({ error: false, data: { id: attributeType.get('id') } })
      })
      .otherwise(function (err) {
        res.status(500).json({ error: true, data: { message: err.message } })
      })
  })

router.route('/shelf-beers')
  // create a shelf beer
  .post(function (req, res) {
    ShelfBeerUtil.saveShelfBeer(req.body)
      .then(function (shelfBeer) {
        if (shelfBeer) {
          res.json({ error: false, data: { id: shelfBeer.get('id') } })
        } else {
          res.status(500).json({ erorr: true, data: { message: 'Unable to create new object.' } })
        }
      })
      .catch(function (err) {
        res.status(500).json({ error: true, data: { message: err.message } })
      })
  })
  .put(function (req, res) {
    ShelfBeerUtil.saveShelfBeer(req.body)
      .then(function (shelfBeer) {
        if (shelfBeer) {
          res.json({ error: false, data: { id: shelfBeer.get('id') } })
        } else {
          res.status(500).json({ erorr: true, data: { message: 'Unable to create new object.' } })
        }
      })
      .catch(function (err) {
        console.error('something went wrong ' + err)
        res.status(500).json({ error: true, data: { message: err.message } })
      })
  })

router.route('/shelf-beers/:beer_id')
  .delete(function (req, res) {
    ShelfBeer.forge({ id: req.params.beer_id })
      .destroy()
      .then(function () {
        res.json({ error: false })
      })
      .catch(function (err) {
        console.error('something went wrong ' + err)
        res.status(500).json({ error: true })
      })
  })

module.exports = router
