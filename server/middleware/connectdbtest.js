import promise from 'bluebird';

const options = {
  // Initialization Options
  promiseLib: promise
};
const pgp = require('pg-promise')(options);
const connectionString =
'postgres://pjaobuno:E4kEfwo7foXQ-FqAl6FGvtlKRELB9oRv@baasu.db.elephantsql.com:5432/pjaobuno';
const db = pgp(connectionString);

export default db;
