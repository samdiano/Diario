import db from '../middleware/connectdb';
import validateEntry from '../middleware/validateEntry';


class EntriesController {
  // get all entries
  static async getAllEntries(req, res) {
    const entries = await db.any('SELECT * FROM entries where userid = $1', req.user.id);
    if (entries.length === 0) return res.status(404).json({ message: 'No entries posted yet', status: 'error' });
    res.status(200).json({ status: 'success', entries, message: 'Retrieved ALL Entries' });
  }

  // Get single entry
  static async getEntry(req, res) {
    const entryID = parseInt(req.params.id, 10);
    const entry = await db.any('SELECT * FROM entries where id = $1 and userid =$2', [entryID, req.user.id]);
    if (entry.length === 0) return res.status(404).json({ message: 'Entry does not exist', status: 'error' });
    res.status(200).json({ status: 'success', entry, message: 'Retrieved ONE entry' });
  }

  // Add entry
  static async addEntry(req, res) {
    const { error } = validateEntry(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message, status: 'Failed' });
    req.body.userid = req.user.id;
    await db.any('insert into entries(userid, title, body) values(${userid}, ${title}, ${body})', req.body);
    res.status(201).json({ status: 'success', message: 'Inserted one Entry' });
  }

  // modify fields in an entry
  static async updateEntry(req, res) {
    const { error } = validateEntry(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message, status: 'Failed' });
    const result = await db.result('update entries set title=$1, body=$2 where id=$3 and userid=$4', [req.body.title, req.body.body, parseInt(req.params.id, 10), req.user.id]);
    if (result.rowCount === 0) return res.status(404).json({ message: 'Entry does not exist', status: 'error' });
    res.status(200).json({ status: 'success', message: 'Updated one entry' });
  }

  // remove entry
  static async removeEntry(req, res) {
    const entryID = parseInt(req.params.id, 10);
    const result = await db.result('delete from entries where id = $1 and userid= $2', [entryID, req.user.id]);
    if (result.rowCount === 0) return res.status(404).json({ message: 'Entry does not exist', status: 'error' });
    res.status(200).json({ status: 'success', message: 'Entry deleted successfully' });
  }
}

export default EntriesController;
