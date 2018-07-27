import promise from 'bluebird';
import jwt from 'jsonwebtoken';

const options = {
  // Initialization Options
  promiseLib: promise
};
const pgp = require('pg-promise')(options);
const connectionString = 'postgres://zehxatan:EP22Gmb985sp3eXwp2z94Hz-9nlbr4D4@stampy.db.elephantsql.com:5432/zehxatan';
const db = pgp(connectionString);

class EntriesController {
  // get all entries
  static async getAllEntries(req, res) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: 'Access denied, no token provided', status: 'Failed' });
    const decoded = jwt.verify(token, 'oiraid');
    req.user = decoded;
    const entries = await db.any('SELECT * FROM entries where userid = $1', decoded.id);
    res.status(200).json({ status: 'success', entries, message: 'Retrieved ALL Entries' });
  }
}

export default EntriesController;
