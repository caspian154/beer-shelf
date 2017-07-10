'use strict'

var express = require('express')
var path = require('path')
var router = express.Router()

var ShelfBeer = require('../models/shelfBeer')
var ShelfAttributeType = require('../models/shelfAttributeType')

var ShelfBeerUtil = require('../models/util/shelfBeerUtil')
var csv = require('csv-parser')
var multer = require('multer')

var fs = require('fs')

// var storage = multer.memoryStorage()
// var upload = multer({ storage: storage })

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var importPath = path.resolve('imports', req.params.user_id)
    if (!fs.existsSync(importPath)) {
      fs.mkdirSync(importPath)
    }
    cb(null, importPath)
  },
  filename: function (req, file, cb) {
    console.log(JSON.stringify(file))
    cb(null, file.originalname.replace('.csv', '-' + Date.now() + '.csv'))
  }
})

var upload = multer({ storage: storage })

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

router.route('/shelf-beers/user/:user_id/import')
  .post(upload.single('shelfCsvFile'), function (req, res) {
    console.log('Uploading file')
    var headers = []
    var responseData = []
    var sent = false
    // streamifier.createReadStream(req.file.buffer)
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('headers', function (headerList) {
        headers = headerList
      })
      .on('data', function (data) {
        if (!data) {
          res.status(500).send()
          return
        }

        // get the data for this row.
        var rowData = []
        for (var i = 0; i < headers.length; i++) {
          rowData.push(data[headers[i]])
        }
        responseData.push({ row: rowData })
        
        // if we have 4 rows, stop processing and send a response
        if (responseData.length === 4) {
          sent = true
          res.status(200).send({ headers: headers, data: responseData })
        }
      })
      .on('end', function () {
        if (!sent) {
          res.status(200).send({ headers: headers, data: responseData })
        }
      })
      .on('error', function (err) {
        console.error('error: ', err)
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
