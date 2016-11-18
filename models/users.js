'use strict';

let bookshelf = require('../database');
let User = require('./user');

var Users = bookshelf.Collection.extend({
  model: User
});

module.exports = Users;
