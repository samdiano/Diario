import entries from '../model/entries';

class EntriesController {
  // get all entries
  static getAllEntries(req, res) {
    return res.status(200).json({
      entries,
      status: 'Ok',
      message: 'All entries'
    });
  }
  static getEntry(req, res) {
    const entry = entries.find(c => c.id === parseInt(req.params.id, 10));
    if (!entry) {
      return res.status(404).json({
        message: 'Entry does not exist',
        status: 'error'
      });
    }
    return res.status(200).json({
      entry,
      status: 'Success'
    });
  }
}

export default EntriesController;
