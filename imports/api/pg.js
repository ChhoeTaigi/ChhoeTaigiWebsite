import knex from 'knex';

let pg;
if (Meteor.isServer) {
    pg = knex({
        client: 'postgresql',
        connection: {
          host:     '127.0.0.1',
          database: 'dictionary',
          user:     'postgres',
          password: '12345678',
        }
    });
}

export default pg;