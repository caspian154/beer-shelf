'use strict';

let bookshelf = require('../database');
let AttributeDataType = require('./attributeDataType');

var ShelfAttributeType = bookshelf.Model.extend({
  tableName: 'shelf_attribute_type',
  hasTimestamps: true
});

module.exports = ShelfAttributeType;
