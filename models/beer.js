'use strict';

let bookshelf = require('../database');
let Brewery = require('./brewery');

var Beer = bookshelf.Model.extend({
  tableName: 'beers',
  hasTimestamps: true,
  brewery: function() {
    return this.belongsTo(Brewery);
  }
});

module.exports = Beer;
