import promise from 'bluebird';
import Joi from 'joi';
import jwt from 'jsonwebtoken';

const options = {
  // Initialization Options
  promiseLib: promise
};
const pgp = require('pg-promise')(options);
const connectionString = 'postgres://zehxatan:EP22Gmb985sp3eXwp2z94Hz-9nlbr4D4@stampy.db.elephantsql.com:5432/zehxatan';
const db = pgp(connectionString);

const validateEntry = (entry) => {
  const schema = {
    title: Joi.string().min(3).trim().required(),
    body: Joi.string().min(3).trim().required(),
    userid: Joi.number().min(1)
  };
  return Joi.validate(entry, schema);
};


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

  static async getEntry(req, res) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: 'Access denied, no token provided', status: 'Failed' });
    const decoded = jwt.verify(token, 'oiraid');
    const entryID = parseInt(req.params.id, 10);
    const entry = await db.any('SELECT * FROM entries where id = $1 and userid =$2', [entryID, decoded.id]);
    if (entry.length === 0) return res.status(404).json({ message: 'Entry does not exist', status: 'error' });
    res.status(200).json({ status: 'success', entry, message: 'Retrieved ONE entry' });
  }

  static async addEntry(req, res) {
    const { error } = validateEntry(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message, status: 'Failed' });
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: 'Access denied, no token provided', status: 'Failed' });
    const decoded = jwt.verify(token, 'oiraid');
    req.body.userid = decoded.id;
    await db.any('insert into entries(userid, title, body) values(${userid}, ${title}, ${body})', req.body);
    res.status(201).json({ status: 'success', message: 'Inserted one Entry' });
  }
}

export default EntriesController;
