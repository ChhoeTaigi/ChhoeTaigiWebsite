import knex from 'knex';
import constants from '../constants/constants';

let postgres;
if (Meteor.isServer) {
  postgres = knex({
    client: 'postgresql',
    connection: {
      host: constants.HOST,
      database: constants.PG_DEFAULT_DATABASE,
      user: constants.PG_USER,
      password: constants.PG_PSWD,
    }
  });
}

export default postgres;