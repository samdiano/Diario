import promise from 'bluebird';

const options = {
  // Initialization Options
  promiseLib: promise
};
const pgp = require('pg-promise')(options);
let db;
if (process.env.NODE_ENV === 'test') {
  const connectionString = 'postgres://pjaobuno:E4kEfwo7foXQ-FqAl6FGvtlKRELB9oRv@baasu.db.elephantsql.com:5432/pjaobuno';
  db = pgp(connectionString);
} else {
  const connectionString = 'postgres://zehxatan:EP22Gmb985sp3eXwp2z94Hz-9nlbr4D4@stampy.db.elephantsql.com:5432/zehxatan';
  db = pgp(connectionString);
}
export default db;
