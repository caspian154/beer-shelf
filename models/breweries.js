'use strict';

let bookshelf = require('../database');
let Brewery = require('./brewery');

var Breweries = bookshelf.Collection.extend({
  model: Brewery
});

module.exports = Breweries;
