import chai, { expect } from 'chai';
import jwt from 'jsonwebtoken';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);
const token = jwt.sign({ id: 1 }, 'oiraid', { expiresIn: 86400 });

describe('Entries', () => {
  const entry = {
    userid: 1,
    title: 'The day I first ....',
    body: 'Paragraph ...'
  };

  it('should return welcome message', (done) => {
    chai.request(server)
      .get('/api/v1/')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Welcome to Diario Api v1.0.0');
        done();
      });
  });
  it('should throw an exception when token is invalid', (done) => {
    chai.request(server)
      .get('/api/v1/entries')
      .set('x-auth-token', 'djdjdjk')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Invalid token');
        expect(res.body.status).to.equal('Failed');
        done();
      });
  });
  it('should throw an exception when no token is provided', (done) => {
    chai.request(server)
      .get('/api/v1/entries')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('Access denied, no token provided');
        expect(res.body.status).to.equal('Failed');
        done();
      });
  });
  it('should return all entries ', (done) => {
    chai.request(server)
      .get('/api/v1/entries')
      .set('x-auth-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.entries[0]).to.have.property('id');
        expect(res.body.entries[0]).to.have.property('title');
        expect(res.body.entries[0]).to.have.property('body');
        expect(res.body.entries[0]).to.have.property('userid');
        done();
      });
  });
  it('should return an entry if a valid id is passed', (done) => {
    chai.request(server)
      .get('/api/v1/entries/1')
      .set('x-auth-token', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.entry[0]).to.have.property('title');
        expect(res.body.entry[0]).to.have.property('body');
        expect(res.body.entry[0]).to.have.property('userid');
        expect(res.body.entry[0]).to.have.property('id').equal(3);
        done();
      });
  });
  it('should not return an entry with an invalid id', (done) => {
    chai.request(server)
      .get('/api/v1/entries/255')
      .set('x-auth-token', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status').equal('error');
        done();
      });
  });
  it('Should post an entry', (done) => {
    chai.request(server)
      .post('/api/v1/entries')
      .set('x-auth-token', token)
      .send(entry)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('status').equal('success');
        expect(res.body).to.have.property('message').equal('Inserted one Entry');
        done();
      });
  });
  it('Should not post an entry with incomplete fields', (done) => {
    chai.request(server)
      .post('/api/v1/entries')
      .set('x-auth-token', token)
      .send({
        userId: 1,
        title: 'The day I first ....',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status').equal('Failed');
        done();
      });
  });
});
