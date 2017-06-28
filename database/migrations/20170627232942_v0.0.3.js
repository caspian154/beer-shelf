
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('user_reviews', function (table) {
      table.increments()
      table.integer('user_id')
      table.integer('beer_id')
      table.double('overall')
      table.string('comments')
      table.foreign('user_id').references('users.id')
      table.foreign('beer_id').references('beers.id')
      table.timestamps()
    })
  ])
}

exports.down = function (knex, Promise) {
}
