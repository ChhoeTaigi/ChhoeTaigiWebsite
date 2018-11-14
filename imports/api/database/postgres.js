import knex from 'knex';

const host = require('../constants/host');

let postgres;
if (Meteor.isServer) {
    postgres = knex({
        client: 'postgresql',
        connection: {
          host: host,
          database: 'dictionary',
          user:     'postgres',
          password: '12345678',
        }
    });
}

export default postgres;