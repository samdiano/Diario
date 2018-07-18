import Joi from 'joi';
import entries from '../model/entries';

const validateEntry = (entry) => {
  const schema = {
    title: Joi.string().min(3).trim().required(),
    body: Joi.string().min(3).trim().required(),
    userId: Joi.number().min(1).required(),
    date: Joi.date().required()
  };
  return Joi.validate(entry, schema);
};

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
  static addEntry(req, res) {
    const {
      title, body, date, userId
    } = req.body;
    const { error } = validateEntry(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
        status: 'Failed'
      });
    }
    const entry = {
      id: entries.length + 1,
      title,
      body,
      date,
      userId
    };
    entries.push(entry);
    return res.status(201).json({
      entry,
      status: 'Success',
      message: 'Entry added successfully'
    });
  }
  // modify fields in an entry
  static updateEntry(req, res) {
    const entry = entries.find(c => c.id === parseInt(req.params.id, 10));
    if (!entry) {
      return res.status(404).json({
        message: 'Entry does not exist',
        status: 'error'
      });
    }
    const {
      title, body, date, userId
    } = req.body;
    const { error } = validateEntry(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
        status: 'Failed'
      });
    }
    entry.title = title;
    entry.body = body;
    entry.date = date;
    entry.userId = userId;

    return res.status(200).json({
      entry,
      status: 'Success',
      message: 'Entry updated successfully'
    });
  }
  // remove entry
  static removeEntry(req, res) {
    const entry = entries.find(c => c.id === parseInt(req.params.id, 10));
    if (!entry) {
      return res.status(404).json({
        message: 'Entry does not exist',
        status: 'error'
      });
    }
    const index = entries.indexOf(entry);
    entries.splice(index, 1);

    return res.status(200).json({
      entry,
      status: 'Success',
      message: 'Entry deleted successfully'
    });
  }
}

export default EntriesController;
