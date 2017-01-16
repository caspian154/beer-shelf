'use strict';

let bookshelf = require('../database');
let ShelfAttributeType = require('./shelfAttributeType')
let ShelfBeer = require('./shelfBeer')

var ShelfBeerAttribute = bookshelf.Model.extend({
  tableName: 'shelf_beer_attribute',
  hasTimestamps: true
  , attributeType: function() {
    return this.belongsTo(ShelfAttributeType)
  }
});

module.exports = ShelfBeerAttribute;
