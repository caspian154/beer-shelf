'use strict';

let bookshelf = require('../database');
let Role = require('./role')
let User = require('./user')

var UserRole = bookshelf.Model.extend({
  tableName: 'user_role',
  hasTimestamps: true,
  role: function() {
    return this.belongsTo(Role)
  },
  user: function() {
    return this.belongsTo(User)
  }
});

module.exports = UserRole;
