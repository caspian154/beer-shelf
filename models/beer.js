'use strict';

let bookshelf = require('../database');

var Beer = bookshelf.Model.extend({
  tableName: 'beers'
});

module.exports = Beer;
