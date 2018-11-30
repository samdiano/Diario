'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

var _connectdb = require('../middleware/connectdb');

var _connectdb2 = _interopRequireDefault(_connectdb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);
const token = _jsonwebtoken2.default.sign({ id: 1 }, 'oiraid', { expiresIn: 86400 });
const token2 = _jsonwebtoken2.default.sign({ id: 7777 }, 'oiraid', { expiresIn: 86400 });

describe('Entries', () => {
  const entry = {
    userid: 2,
    title: 'The day I first ....',
    body: 'Paragraph ...'
  };
  before('truncating db', () => _connectdb2.default.none('TRUNCATE entries RESTART IDENTITY'));

  it('should return welcome message', done => {
    _chai2.default.request(_app2.default).get('/api/v1/').end((err, res) => {
      (0, _chai.expect)(res.status).to.equal(200);
      (0, _chai.expect)(res.body.message).to.equal('Welcome to Diario Api v1.0.0');
      done();
    });
  });
  it('Should post an entry', done => {
    _chai2.default.request(_app2.default).post('/api/v1/entries').set('x-auth-token', token).send(entry).end((err, res) => {
      (0, _chai.expect)(res.status).to.equal(201);
      (0, _chai.expect)(res.body).to.have.property('message').equal('Inserted one Entry');
      done();
    });
  });
  it('Should not post an entry with incomplete fields', done => {
    _chai2.default.request(_app2.default).post('/api/v1/entries').set('x-auth-token', token).send({
      userId: 1,
      title: 'The day I first ....'
    }).end((err, res) => {
      (0, _chai.expect)(res.status).to.equal(400);
      (0, _chai.expect)(res.body).to.have.property('message');
      done();
    });
  });
  it('Should update an entry', done => {
    _chai2.default.request(_app2.default).put('/api/v1/entries/1').set('x-auth-token', token).send({
      title: 'The school of Law ....',
      body: 'Paragraph ...'
    }).end((err, res) => {
      (0, _chai.expect)(res.body.message).to.equal('Updated one entry');
      (0, _chai.expect)(res.status).to.equal(200);
      done();
    });
  });
  it('Should not update an entry with an invalid ID', done => {
    _chai2.default.request(_app2.default).put('/api/v1/entries/3500').set('x-auth-token', token).send({
      title: 'The day I first ....',
      body: 'Paragraph ...'
    }).end((err, res) => {
      (0, _chai.expect)(res.status).to.equal(404);
      done();
    });
  });
  it('Should not update an entry with incomplete fields', done => {
    _chai2.default.request(_app2.default).put('/api/v1/entries/1').set('x-auth-token', token).send({
      title: 'The day I first ....'
    }).end((err, res) => {
      (0, _chai.expect)(res.status).to.equal(400);
      (0, _chai.expect)(res.body).to.have.property('message');
      done();
    });
  });
  it('should throw an exception when token is invalid', done => {
    _chai2.default.request(_app2.default).get('/api/v1/entries').set('x-auth-token', 'djdjdjk').end((err, res) => {
      (0, _chai.expect)(res.status).to.equal(400);
      (0, _chai.expect)(res.body.message).to.equal('Invalid token');
      done();
    });
  });
  it('should throw an exception when no token is provided', done => {
    _chai2.default.request(_app2.default).get('/api/v1/entries').end((err, res) => {
      (0, _chai.expect)(res.status).to.equal(401);
      (0, _chai.expect)(res.body.message).to.equal('Access denied, no token provided');
      done();
    });
  });
  it('should return all entries ', done => {
    _chai2.default.request(_app2.default).get('/api/v1/entries').set('x-auth-token', token).end((err, res) => {
      (0, _chai.expect)(res.status).to.equal(200);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.entries[0]).to.have.property('id');
      (0, _chai.expect)(res.body.entries[0]).to.have.property('title');
      (0, _chai.expect)(res.body.entries[0]).to.have.property('body');
      (0, _chai.expect)(res.body.entries[0]).to.have.property('userid');
      done();
    });
  });
  it('should return error if no entries posted ', done => {
    _chai2.default.request(_app2.default).get('/api/v1/entries').set('x-auth-token', token2).end((err, res) => {
      (0, _chai.expect)(res.status).to.equal(404);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body).to.have.property('message');

      done();
    });
  });
  it('should return an entry if a valid id is passed', done => {
    _chai2.default.request(_app2.default).get('/api/v1/entries/1').set('x-auth-token', token).end((err, res) => {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.status).to.equal(200);
      (0, _chai.expect)(res.body.entry[0]).to.have.property('title');
      (0, _chai.expect)(res.body.entry[0]).to.have.property('body');
      (0, _chai.expect)(res.body.entry[0]).to.have.property('userid');
      (0, _chai.expect)(res.body.entry[0]).to.have.property('id').equal(1);
      done();
    });
  });
  it('should not return an entry with an invalid id', done => {
    _chai2.default.request(_app2.default).get('/api/v1/entries/255').set('x-auth-token', token).end((err, res) => {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.status).to.equal(404);
      (0, _chai.expect)(res.body).to.have.property('message');
      done();
    });
  });
  it('Should delete the entry with the specified id', done => {
    _chai2.default.request(_app2.default).delete('/api/v1/entries/1').set('x-auth-token', token).end((err, res) => {
      (0, _chai.expect)(res.body.message).to.equal('Entry deleted successfully');
      (0, _chai.expect)(res.status).to.equal(200);
      done();
    });
  });
  it('Should not delete an entry with an invalid ID', done => {
    _chai2.default.request(_app2.default).delete('/api/v1/entries/3500').set('x-auth-token', token).end((err, res) => {
      (0, _chai.expect)(res.status).to.equal(404);
      (0, _chai.expect)(res.body).to.have.property('message').equal('Entry does not exist');
      done();
    });
  });
});