import knex from 'knex';

const host = require('./host');

let pg;
if (Meteor.isServer) {
    pg = knex({
        client: 'postgresql',
        connection: {
          host: host,
          database: 'dictionary',
          user:     'postgres',
          password: '12345678',
        }
    });
}

export default pg;