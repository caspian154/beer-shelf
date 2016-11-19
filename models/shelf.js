'use strict';

let bookshelf = require('../database');

var Shelf = bookshelf.Model.extend({
  tableName: 'shelf'
});

module.exports = Shelf;
