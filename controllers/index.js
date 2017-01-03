'use strict';

var express = require('express');
var router = express.Router();

router.use('/api', require('./authenticate'));
router.use('/api', require('./users'));
router.use('/api', require('./breweries'));
router.use('/api', require('./beers'));
router.use('/api', require('./shelfBeers'));

router.use('/', express.static(__dirname + '/../public'));

module.exports = router;
