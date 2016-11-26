'use strict';

var express = require('express');
var router = express.Router();

router.use('/api', require('./authenticate'));
router.use('/api', require('./users'));
router.use('/api', require('./breweries'));

router.use('/book', express.static(__dirname + '/../book'));
router.use('/', express.static(__dirname + '/../public'));

module.exports = router;
