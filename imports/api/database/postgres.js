import knex from 'knex';

const host = require('../constants/host');

let postgres;
if (Meteor.isServer) {
    postgres = knex({
        client: 'postgresql',
        connection: {
          host: host,
          database: 'm94c52efefa744bed029f00030f755458cf2ca157',
          user:     'pi',
          password: 'qazxcvbnm',
        }
    });
}

export default postgres;