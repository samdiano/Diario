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
};

export default routes;
