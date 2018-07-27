import entries from '../controllers/EntriesController';
import auth from '../controllers/UsersController';
import authenticate from '../middleware/auth';

const routes = (app) => {
  app.get('/api/v1', (req, res) => {
    res.status(200).json({
      status: 'Success',
      message: 'Welcome to Diario Api v1.0.0'
    });
  });
  // Entry routes
  app.get('/api/v1/entries', authenticate, entries.getAllEntries);


  // Auth routes
  app.post('/api/v1/auth/signin', auth.signIn);
  app.post('/api/v1/auth/signup', auth.signUp);
};

export default routes;
