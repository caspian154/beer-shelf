'use strict';

let bookshelf = require('../database')

var Role = bookshelf.Model.extend({
  tableName: 'roles',
  hasTimestamps: true
});

module.exports = Role;
