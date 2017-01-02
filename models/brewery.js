'use strict';

let bookshelf = require('../database');

var Brewery = bookshelf.Model.extend({
  tableName: 'breweries',
  hasTimestamps: true
});

module.exports = Brewery;
