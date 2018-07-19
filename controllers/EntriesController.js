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
}

export default EntriesController;
