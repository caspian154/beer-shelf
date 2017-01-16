'use strict';

var express = require('express');
var router = express.Router();

var Beer = require('../models/beer')
var ShelfBeer = require('../models/shelfBeer')
var ShelfBeerAttribute = require('../models/shelfBeerAttribute')
var ShelfBeerAttributes = require('../models/shelfBeerAttributes')

var ShelfBeerUtil = require('../models/util/shelfBeerUtil')
var Parser = require('./external-lookup/BeerAdvocateParser')

var _    = require('underscore');
var when = require('when');

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
    // ShelfBeer.forge({
    //   user_id: req.body.user_id,
    //   beer_id: req.body.beer_id,
    //   quantity: req.body.quantity,
    //   size: req.body.size,
    //   vintage: req.body.vintage
    // })
    // .save()
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
  // .put(function (req, res) {

  //   ShelfBeerUtil.saveShelfBeer(req)

  //   ShelfBeer.forge({id: req.body.id})
  //   .fetch({require: true, withRelated: ['beerAttributes']})
  //   .then(function (shelfBeer) {
  //     shelfBeer.vintage = req.body.vintage
  //     //shelfBeer.beerAttributes().forge(req.body.beerAttributes)

  //     // shelfBeer.save({
  //     //   id: req.body.id,
  //     //   beer_id: req.body.beer_id,
  //     //   quantity: req.body.quantity,
  //     //   size: req.body.size,
  //     //   vintage: req.body.vintage
  //     // })
  //     shelfBeer.save()
  //     .then(function (sb) {
  //       // sb.beerAttributes()
  //       //sb.beerAttributes().attach(req.body.beerAttributes)
  //     //   return when.all(_.map(req.body.beerAttributes, function(att) {
  //     //     return att.save();
  //     //   })).yield(sb)
  //     // })
  //     // .then(function (sb) {
  //       // var attributes = ShelfBeerAttributes.forge(req.body.beerAttributes)

  //       // Promise.all(attributes.invokeThen('save')).then(function() {
  //       //   // collection models should now be saved...
  //       // });
  //       // res.json({error: false, data: {id: shelfBeer.get('id')}})
  //     })
  //     .catch(function (err) {
  //       console.error('something went wrong ' + err)
  //       res.status(500).json({error: true, data: {message: err.message}})
  //     });
  //   })
  //   .catch(function (err) {
  //     console.error('something went wrong ' + err)
  //     res.status(500).json({error: true, data: {message: err.message}});
  //   });
  // })

module.exports = router;
