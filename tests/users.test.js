import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);

describe('Users', () => {
  const user = {
    full_name: 'Samuel George',
    email: 'sammy@sammy.com',
    password: 'password'
  };

  it('Should signup a user', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('status').equal('success');
        expect(res.body).to.have.property('message').equal('Inserted one user');
        done();
      });
  });
  it('Should not signup a user with incomplete fields', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({ email: 'sammy@sammy.com' })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('status').equal('Failed');
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('Should authenticate a valid user', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: 'Tyler@mail.com',
        password: 'password'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message').equal('Login succesful');
        expect(res.body).to.have.property('status').equal('success');
        done();
      });
  });
  it('Should not signin a user with incomplete fields', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send({ password: 'password' })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('status').equal('Failed');
        expect(res.body).to.have.property('message').equal('"email" is required');
        done();
      });
  });
  it('Should not signin a user with incorrect password', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: 'Tyler@mail.com',
        password: 'passwordsss'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('status').equal('Failed');
        expect(res.body).to.have.property('message').equal('Invalid email or password');
        done();
      });
  });
});
