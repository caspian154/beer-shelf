'use strict';

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'beer.shelf',
    password : 'coffee bomb',
    database : 'beer_shelf',
    charset  : 'utf8'
  }
});

var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry'); // Resolve circular dependencies with relations

module.exports = bookshelf;
