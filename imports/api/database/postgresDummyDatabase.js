import knex from 'knex';
import constants from '../constants/constants';

let postgresDummyDatabase;
if (Meteor.isServer) {
  if (Meteor.isProduction) {
    postgresDummyDatabase = knex({
      client: 'pg',
      connection: {
        host: constants.HOST,
        database: 'postgres',
        user: constants.PG_USER,
        password: constants.PG_PSWD,
        multipleStatements: true
      }
    });
  } else {
    postgresDummyDatabase = knex({
      client: 'pg',
      connection: {
        host: constants.HOST_LOCAL,
        database: 'postgres',
        user: constants.PG_USER,
        password: constants.PG_PSWD,
        multipleStatements: true
      }
    });
  }
}

export default postgresDummyDatabase;