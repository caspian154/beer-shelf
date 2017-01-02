'use strict';

let bookshelf = require('../database');
let Beer = require('./beer');

var Beers = bookshelf.Collection.extend({
  model: Beer
});

module.exports = Beers;
