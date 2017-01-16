'use strict';

let bookshelf = require('../database');

var AttributeDataType = bookshelf.Model.extend({
  tableName: 'attribute_data_type',
  hasTimestamps: true
});

module.exports = AttributeDataType;
