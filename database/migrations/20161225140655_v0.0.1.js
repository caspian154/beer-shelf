
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
      table.integer('role_id');
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
      table.integer('brewery_id');
      table.string('beer_advocate_id');
      table.timestamps();
      table.foreign('brewery_id').references('breweries.id')
    }),
    knex.schema.createTable('shelf_beers', function(table){
      table.increments();
      table.integer('user_id');
      table.integer('beer_id');
      table.integer('quantity');
      table.integer('size');
      table.date('vintage');
      table.timestamps();
      table.foreign('user_id').references('users.id')
      table.foreign('beer_id').references('beers.id')
    }),
    knex.schema.createTable('attribute_data_type', function(table){
      table.increments()
      table.string('name')
      table.timestamps()
    }),
    knex.schema.createTable('shelf_attribute_type', function(table){
      table.increments()
      table.string('name')
      table.integer('attribute_data_type_id')
      table.timestamps()
      table.foreign('attribute_data_type_id').references('attribute_data_type.id')
    }),
    knex.schema.createTable('shelf_beer_attribute', function(table){
      table.increments()
      table.integer('shelf_attribute_type_id')
      table.integer('shelf_beers_id')
      table.string('value')
      table.timestamps()
      table.foreign('shelf_attribute_type_id').references('shelf_attribute_type.id')
      table.foreign('shelf_beers_id').references('shelf_beers.id')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ])
};
