import knex from 'knex';

export const host = '127.0.0.1';

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