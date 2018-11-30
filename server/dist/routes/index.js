'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _EntriesController = require('../controllers/EntriesController');

var _EntriesController2 = _interopRequireDefault(_EntriesController);

var _UsersController = require('../controllers/UsersController');

var _UsersController2 = _interopRequireDefault(_UsersController);

var _auth = require('../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = app => {
  app.get('/api/v1', (req, res) => {
    res.status(200).json({
      status: 'Success',
      message: 'Welcome to Diario Api v1.0.0'
    });
  });
  // Entry routes
  app.get('/api/v1/entries', _auth2.default, _EntriesController2.default.getAllEntries);
  app.get('/api/v1/entries/:id', _auth2.default, _EntriesController2.default.getEntry);
  app.post('/api/v1/entries', _auth2.default, _EntriesController2.default.addEntry);
  app.put('/api/v1/entries/:id', _auth2.default, _EntriesController2.default.updateEntry);
  app.delete('/api/v1/entries/:id', _auth2.default, _EntriesController2.default.removeEntry);

  // Auth routes
  app.post('/api/v1/auth/login', _UsersController2.default.signIn);
  app.post('/api/v1/auth/signup', _UsersController2.default.signUp);
  app.put('/api/v1/reminder', _auth2.default, _UsersController2.default.setReminder);
  app.get('/api/v1/reminder', _auth2.default, _UsersController2.default.getReminder);
  app.get('/api/v1/profile', _auth2.default, _UsersController2.default.getUser);
  app.put('/api/v1/profile', _auth2.default, _UsersController2.default.updateUser);

  // Frontend Routes
  const root = 'UI';
  app.get('/assets/css/style.css', (req, res) => {
    res.sendFile('/assets/css/style.css', { root });
  });
  app.get('/assets/js/main.js', (req, res) => {
    res.sendFile('/assets/js/main.js', { root });
  });
  app.get('/assets/js/modal.js', (req, res) => {
    res.sendFile('/assets/js/modal.js', { root });
  });
  app.get('/assets/js/signup.js', (req, res) => {
    res.sendFile('/assets/js/signup.js', { root });
  });
  app.get('/assets/js/signin.js', (req, res) => {
    res.sendFile('/assets/js/signin.js', { root });
  });
  app.get('/assets/js/getEntries.js', (req, res) => {
    res.sendFile('/assets/js/getEntries.js', { root });
  });
  app.get('/assets/js/getEntry.js', (req, res) => {
    res.sendFile('/assets/js/getEntry.js', { root });
  });
  app.get('/assets/js/createEntry.js', (req, res) => {
    res.sendFile('/assets/js/createEntry.js', { root });
  });
  app.get('/assets/js/updateEntry.js', (req, res) => {
    res.sendFile('/assets/js/updateEntry.js', { root });
  });
  app.get('/assets/js/deleteEntry.js', (req, res) => {
    res.sendFile('/assets/js/deleteEntry.js', { root });
  });
  app.get('/assets/js/profile.js', (req, res) => {
    res.sendFile('/assets/js/profile.js', { root });
  });

  app.get('/', (req, res) => {
    res.sendFile('index.html', { root });
  });
  app.get('/create-entry', (req, res) => {
    res.sendFile('create-entry.html', { root });
  });
  app.get('/update-entry/:id', (req, res) => {
    res.sendFile('update-entry.html', { root });
  });
  app.get('/signup', (req, res) => {
    res.sendFile('signup.html', { root });
  });
  app.get('/login', (req, res) => {
    res.sendFile('login.html', { root });
  });
  app.get('/profile', (req, res) => {
    res.sendFile('profile.html', { root });
  });
  app.get('/home', (req, res) => {
    res.sendFile('dashboard.html', { root });
  });
  app.get('/entries/:id', (req, res) => {
    res.sendFile('view-entry.html', { root });
  });
  app.get('/delete-entry/:id', (req, res) => {
    res.sendFile('delete-entry.html', { root });
  });
};

exports.default = routes;