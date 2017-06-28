
exports.up = function (knex, Promise) {
  return knex.schema.renameTable('users', 'old_users')
    .then(function () {
      return knex.schema.createTable('users', function (table) {
        table.increments()
        table.string('email')
        table.string('name')
        table.string('password')
        table.boolean('reset_password_flag')
        table.timestamps()
      })
    })
    .then(function () {
      return knex.schema.createTable('user_role', function (table) {
        table.increments()
        table.integer('user_id')
        table.integer('role_id')
        table.timestamps()
        table.foreign('user_id').references('users.id')
        table.foreign('role_id').references('roles.id')
      })
    })
    .then(function () {
      return knex.schema.raw(
        'INSERT INTO user_role (user_id, role_id) ' +
        'SELECT id, role_id FROM old_users')
    })
    .then(function () {
      return knex.schema.raw(
        'INSERT INTO users (id, email, name, password, reset_password_flag, created_at, updated_at) ' +
        'SELECT id, email, name, password, reset_password_flag, created_at, updated_at FROM old_users')
    })
    .then(function () {
      return knex.schema.dropTable('old_users')
    })
}

exports.down = function (knex, Promise) {
}
