'use strict';

let bookshelf = require('../database');
let ShelfBeer = require('./shelfBeer');

var ShelfBeers = bookshelf.Collection.extend({
  model: ShelfBeer
});

module.exports = ShelfBeers;
