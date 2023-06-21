import knex from 'knex';
import constants from '../constants/constants';

let postgres;
if (Meteor.isServer) {
    if (Meteor.isProduction) {
    postgres = knex({
      client: 'pg',
      connection: {
        host: constants.HOST,
        database: constants.PG_DEFAULT_DATABASE,
        user: constants.PG_USER,
        password: constants.PG_PSWD,
      }
    });
  } else {
    postgres = knex({
      client: 'pg',
      // debug: true,
      connection: {
        host: constants.HOST_LOCAL,
        database: constants.PG_DEFAULT_DATABASE,
        user: constants.PG_USER,
        password: constants.PG_PSWD,
      }
    });
  }
}

export default postgres;