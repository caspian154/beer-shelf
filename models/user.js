'use strict';

let bookshelf = require('../database');

var User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true
});

module.exports = User;
