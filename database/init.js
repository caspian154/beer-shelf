var config    = require('./knexfile.js');
var env       = 'development';
var knex      = require('knex')(config[env]);
const util    = require('util')

function init() {
  console.log('Migrating db...')

  var currentVersion = 'none'
  knex.migrate.currentVersion([config]).then(function(data) {
    currentVersion = data;
    return knex.migrate.latest([config]);
  }).then(function(data) {
    console.log('migration done: ' + data)

    if (currentVersion === 'none') {
      console.log('seeding done: ' + data)
      return knex.seed.run([config]);
    } else {
      return;
    }
  }).then(function(data) {
    if (data) {
      console.log('seeding done: ' + data)
    }

    console.log('Database version is current')
  })

}

module.exports = init
