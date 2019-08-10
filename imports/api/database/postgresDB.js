import knex from 'knex';

const host = require('../constants/host');

let postgresDB;
if (Meteor.isServer) {
    postgresDB = knex({
        client: 'postgresql',
        connection: {
          host: host,
          database: 'data_version',
          user:     'pi',
          password: 'qazxcvbnm',
        }
    });
}

export default postgresDB;