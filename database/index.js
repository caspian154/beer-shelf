var dbconfig = require('./knexfile')
var knex = require('knex')(dbconfig.development);
var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry'); // Resolve circular dependencies with relations

module.exports = bookshelf;
