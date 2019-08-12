import knex from 'knex';
import constants from '../constants/constants';

let postgresDummyDatabase;
if (Meteor.isServer) {
  postgresDummyDatabase = knex({
    client: 'postgresql',
    connection: {
      host: constants.HOST,
      database: 'postgres',
      user: constants.PG_USER,
      password: constants.PG_PSWD,
      multipleStatements: true
    }
  });
}

export default postgresDummyDatabase;