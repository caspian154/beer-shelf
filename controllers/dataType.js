'use strict';

var express = require('express');
var router = express.Router();

var DataType = require('../models/attributeDataType')

router.route('/data-type')
  // fetch all shelf-beers
  .get(function (req, res) {
    DataType.forge()
    .fetchAll()
    .then(function (collection) {
      res.json(collection.toJSON());
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    })
  })

module.exports = router;
