module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: 'database/beershelf.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  },

  production: {
    development: {
      client: 'sqlite3',
      connection: {
        filename: 'database/beershelf.sqlite3'
      },
      useNullAsDefault: true
    }
  }
};
