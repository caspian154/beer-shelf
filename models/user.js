'use strict'

let bookshelf = require('../database')
let UserRole = require('./userRole')

var User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  roles: function () {
    return this.hasMany(UserRole, 'user_id')
  }
})

module.exports = User
