import knex from 'knex';

const host = require('../constants/host');

let postgresDB;
if (Meteor.isServer) {
    postgresDB = knex({
        client: 'postgresql',
        connection: {
          host: host,
          database: 'data_version',
          user:     'postgres',
          password: '12345678',
        }
    });
}

export default postgresDB;