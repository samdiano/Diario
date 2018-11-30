'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);

const token = _jsonwebtoken2.default.sign({ id: 1 }, 'oiraid', { expiresIn: 86400 });

describe('Users', () => {
  const user = {
    full_name: 'Samuel George',
    email: `${Math.random().toString(36).substring(2, 15)}@sammy.com`,
    password: 'password'
  };

  it('Should signup a user', done => {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(user).end((err, res) => {
      (0, _chai.expect)(res.status).to.equal(201);
      (0, _chai.expect)(res.body).to.have.property('users');
      (0, _chai.expect)(res.body).to.have.property('message').equal('Account created successfully');
      done();
    });
  });
  it('Should not signup a user with incomplete fields', done => {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send({ email: 'sammy@sammy.com' }).end((err, res) => {
      (0, _chai.expect)(res.status).to.equal(400);
      (0, _chai.expect)(res.body).to.have.property('message');
      done();
    });
  });
  it('Should authenticate a valid user', done => {
    _chai2.default.request(_app2.default).post('/api/v1/auth/login').send({
      email: 'sammy@sammy.com',
      password: 'password'
    }).end((err, res) => {
      (0, _chai.expect)(res.status).to.equal(200);
      (0, _chai.expect)(res.body).to.have.property('message').equal('Login succesful');
      done();
    });
  });
  it('Should not signin a user with incomplete fields', done => {
    _chai2.default.request(_app2.default).post('/api/v1/auth/login').send({ password: 'password' }).end((err, res) => {
      (0, _chai.expect)(res.status).to.equal(400);
      (0, _chai.expect)(res.body).to.have.property('message').equal('"email" is required');
      done();
    });
  });
  it('Should not signin a user with incorrect password', done => {
    _chai2.default.request(_app2.default).post('/api/v1/auth/login').send({
      email: 'admin@admin.com',
      password: 'passwordsss'
    }).end((err, res) => {
      (0, _chai.expect)(res.status).to.equal(401);
      (0, _chai.expect)(res.body).to.have.property('message').equal('Invalid email or password');
      done();
    });
  });
  it('Should not signup a user that exists', done => {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send({
      full_name: 'Samo alvin',
      email: 'sammy@sammy.com',
      password: 'passwordsss'
    }).end((err, res) => {
      (0, _chai.expect)(res.status).to.equal(409);
      (0, _chai.expect)(res.body).to.have.property('message').equal('User already exists');
      done();
    });
  });
  it('should return the user details ', done => {
    _chai2.default.request(_app2.default).get('/api/v1/profile').set('x-auth-token', token).end((err, res) => {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.status).to.equal(200);
      (0, _chai.expect)(res.body.user[0]).to.have.property('email');
      (0, _chai.expect)(res.body.user[0]).to.have.property('full_name');
      (0, _chai.expect)(res.body.user[0]).to.have.property('created_at');
      done();
    });
  });
  it('Should update user details', done => {
    _chai2.default.request(_app2.default).put('/api/v1/profile').set('x-auth-token', token).send({
      full_name: 'The school of Law ....',
      email: 'sammyg@sammmsam.com'
    }).end((err, res) => {
      (0, _chai.expect)(res.status).to.equal(200);
      (0, _chai.expect)(res.body.message).to.equal('Profile updated successfully');
      done();
    });
  });
  it('Should not update user with bad request', done => {
    _chai2.default.request(_app2.default).put('/api/v1/profile').set('x-auth-token', token).send({
      full_names: 'The school of Law ....',
      email: 'sammyg@sammmsam.com'
    }).end((err, res) => {
      (0, _chai.expect)(res.status).to.equal(400);
      done();
    });
  });
  it('Should set notification', done => {
    _chai2.default.request(_app2.default).put('/api/v1/reminder').set('x-auth-token', token).send({
      remind: true
    }).end((err, res) => {
      (0, _chai.expect)(res.status).to.equal(200);
      (0, _chai.expect)(res.body.message).to.equal('Reminder set succesfully');
      done();
    });
  });
  it('Should not set notification with bad request', done => {
    _chai2.default.request(_app2.default).put('/api/v1/reminder').set('x-auth-token', token).send({
      remind: 'today'
    }).end((err, res) => {
      (0, _chai.expect)(res.status).to.equal(400);
      done();
    });
  });
  it('Should get notification status', done => {
    _chai2.default.request(_app2.default).get('/api/v1/reminder').set('x-auth-token', token).end((err, res) => {
      (0, _chai.expect)(res.status).to.equal(200);
      (0, _chai.expect)(res.body.message).to.equal('Reminder active');
      done();
    });
  });
});