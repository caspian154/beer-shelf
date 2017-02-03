module.exports = {
  cli: {
    client: 'sqlite3',
    connection: {
      filename: 'beershelf.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },

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
