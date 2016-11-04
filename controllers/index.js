'use strict';

var express = require('express');
var router = express.Router();


router.use('/api', require('./authenticate'));
router.use('/api', require('./users'));

router.use('/', express.static(__dirname + '/../public'));
//router.use('/styles', express.static(__dirname + '/../public/styles'));
//router.use('/', express.static(__dirname + '/../public'));

// router.all('/', function(req, res, next) {
//     // Just send the index.html for other files to support HTML5Mode
//     res.sendFile('index.html', {'root': __dirname + '/../public'});
// });

module.exports = router;
