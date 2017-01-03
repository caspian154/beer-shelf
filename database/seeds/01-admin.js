
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('roles').insert({
          id: 0,
          name: 'user'}),
        knex('roles').insert({
          id: 1,
          name: 'admin'}),
        knex('users').insert({
          id: 0,
          email: 'admin@beershelf.com',
          name: 'admin',
          password: 'admin',
          role_id: 1,
          reset_password_flag: true}),
        knex('attribute_data_type').insert({
          id: 1,
          name: 'string'}),
        knex('attribute_data_type').insert({
          id: 2,
          name: 'number'}),
        knex('attribute_data_type').insert({
          id: 3,
          name: 'date'})
      ]);
    });
};
