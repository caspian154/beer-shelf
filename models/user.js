let bookshelf = require('../database');

var User = bookshelf.Model.extend({
  tableName: 'users'
});

module.exports = User;
