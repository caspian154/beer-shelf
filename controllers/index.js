'use strict'

var express = require('express')
var path = require('path')
var router = express.Router()

router.use('/api', require('./authenticate'))
router.use('/api', require('./users'))
router.use('/api', require('./breweries'))
router.use('/api', require('./beers'))
router.use('/api', require('./shelfBeers'))
router.use('/api', require('./dataType'))

// static files
router.use('/', express.static(__dirname + '/../dist', { redirect: false }))
// required for html5 mode
router.get('*', function (req, res, next) {
  res.sendFile(path.resolve('dist/index.html'))
})

module.exports = router
