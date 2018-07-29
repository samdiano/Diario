import promise from 'bluebird';

const options = {
  // Initialization Options
  promiseLib: promise
};
const pgp = require('pg-promise')(options);
const connectionString = 'postgres://zehxatan:EP22Gmb985sp3eXwp2z94Hz-9nlbr4D4@stampy.db.elephantsql.com:5432/zehxatan';
const db = pgp(connectionString);

export default db;
