
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('roles', function(table){
      table.increments();
      table.string('name');
      table.timestamps();
    }),
    knex.schema.createTable('users', function(table){
      table.increments();
      table.string('email');
      table.string('name');
      table.string('password');
      table.int('role_id');
      table.boolean('reset_password_flag')
      table.timestamps();
      table.foreign('role_id').references('roles.id')
    }),
    knex.schema.createTable('breweries', function(table){
      table.increments();
      table.string('name');
      table.string('beer_advocate_id');
      table.timestamps();
    }),
    knex.schema.createTable('beers', function(table){
      table.increments();
      table.string('name');
      table.string('style');
      table.double('abv');
      table.int('brewery_id');
      table.string('beer_advocate_id');
      table.timestamps();
      table.foreign('brewery_id').references('breweries.id')
    }),
    knex.schema.createTable('shelf', function(table){
      table.increments();
      table.int('user_id');
      table.int('beer_id');
      table.int('quantity');
      table.timestamps();
      table.foreign('user_id').references('users.id')
      table.foreign('beer_id').references('beers.id')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ])
};
