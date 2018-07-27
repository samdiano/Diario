import entries from '../controllers/EntriesController';
import auth from '../controllers/UsersController';

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
  app.delete('/api/v1/entries/:id', entries.removeEntry);

  // Auth routes
  app.post('/api/v1/auth/signin', auth.signIn);
};

export default routes;
