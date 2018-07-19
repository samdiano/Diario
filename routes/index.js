import entries from '../controllers/EntriesController';

const routes = (app) => {
  app.get('/api/v1', (req, res) => {
    res.status(200).json({
      status: 'Success',
      message: 'Welcome to Diario Api v1.0.0'
    });
  });
  // Entry routes
  app.get('/api/v1/entries', entries.getAllEntries);
  app.get('/api/v1/entries/:id', entries.getEntry);
  app.post('/api/v1/entries', entries.addEntry);
  app.put('/api/v1/entries/:id', entries.updateEntry);
};

export default routes;
