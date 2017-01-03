'use strict';

let bookshelf = require('../database');
let User = require('./user');
let Beer = require('./beer');

var ShelfBeer = bookshelf.Model.extend({
  tableName: 'shelf_beers',
  hasTimestamps: true,
  user: function() {
    return this.belongsTo(User)
  },
  beer: function() {
    return this.belongsTo(Beer)
  }
});

module.exports = ShelfBeer;
