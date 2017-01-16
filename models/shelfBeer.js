'use strict';

let bookshelf = require('../database');
let User = require('./user');
let Beer = require('./beer');
let ShelfBeerAttribute = require('./shelfBeerAttribute')

var ShelfBeer = bookshelf.Model.extend({
  tableName: 'shelf_beers',
  hasTimestamps: true,
  user: function() {
    return this.belongsTo(User)
  },
  beer: function() {
    return this.belongsTo(Beer)
  }
  , beerAttributes: function() {
    return this.hasMany(ShelfBeerAttribute, 'shelf_beers_id')
  }
});

module.exports = ShelfBeer;
