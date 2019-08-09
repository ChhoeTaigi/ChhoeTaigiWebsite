// Update with your config settings.

const host = require('../imports/api/constants/host.js');

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: host,
      port:     '5432',
      database: 'dictionary',
      user:     'postgres',
      password: '12345678'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host: host,
      port:     '5432',
      database: 'dictionary',
      user:     'postgres',
      password: '12345678'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
