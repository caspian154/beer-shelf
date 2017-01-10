'use strict';

var express = require('express');
var path = require('path');
var router = express.Router();

router.use('/api', require('./authenticate'));
router.use('/api', require('./users'));
router.use('/api', require('./breweries'));
router.use('/api', require('./beers'));
router.use('/api', require('./shelfBeers'));

// static files
router.use('/', express.static(__dirname + '/../public', { redirect: false }))
// required for html5 mode
router.get('*', function (req, res, next) {
  res.sendFile(path.resolve('public/index.html'))
});

module.exports = router;
