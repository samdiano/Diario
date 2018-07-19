import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);

const entry = {
  userId: 8,
  title: 'The day I first ....',
  body: 'Paragraph ...',
  date: '5-7-2019'
};

describe('Entries', () => {
  it('should return welcome message', (done) => {
    chai.request(server)
      .get('/api/v1/')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Welcome to Diario Api v1.0.0');
        done();
      });
  });
  it('should return all entries ', (done) => {
    chai.request(server)
      .get('/api/v1/entries')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.entries[0]).to.have.property('id').equal(1);
        expect(res.body.entries[0]).to.have.property('title').equal('My Title');
        expect(res.body.entries[0]).to.have.property('body').equal('The body');
        expect(res.body.entries[0]).to.have.property('date').equal('5-7-2018');
        expect(res.body.entries[0]).to.have.property('userId').equal(5);
        done();
      });
  });
  it('should return an entry if a valid id is passed', (done) => {
    chai.request(server)
      .get('/api/v1/entries/1')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.entry).to.have.property('title').equal('My Title');
        expect(res.body.entry).to.have.property('body').equal('The body');
        expect(res.body.entry).to.have.property('userId').equal(5);
        expect(res.body.entry).to.have.property('date').equal('5-7-2018');
        expect(res.body.entry).to.have.property('id').equal(1);
        done();
      });
  });
  it('should not return an entry with an invalid id', (done) => {
    chai.request(server)
      .get('/api/v1/entries/25')
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
      .send(entry)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.entry).to.have.property('title').equal(entry.title);
        expect(res.body.entry).to.have.property('body').equal(entry.body);
        expect(res.body.entry).to.have.property('userId').equal(entry.userId);
        expect(res.body.entry).to.have.property('date').equal(entry.date);
        expect(res.body).to.have.property('status').equal('Success');
        done();
      });
  });
  it('Should not post an entry with incomplete fields', (done) => {
    chai.request(server)
      .post('/api/v1/entries')
      .send({
        userId: 8,
        title: 'The day I first ....',
        body: 'Paragraph ...',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status').equal('Failed');
        done();
      });
  });
  it('Should update an entry', (done) => {
    chai.request(server)
      .put('/api/v1/entries/1')
      .send(entry)
      .end((err, res) => {
        expect(res.body.message).to.equal('Entry updated successfully');
        expect(res.status).to.equal(200);
        expect(res.body.entry).to.have.property('title').equal(entry.title);
        expect(res.body.entry).to.have.property('body').equal(entry.body);
        expect(res.body.entry).to.have.property('userId').equal(entry.userId);
        expect(res.body.entry).to.have.property('date').equal(entry.date);
        expect(res.body.entry).to.have.property('id').equal(1);
        expect(res.body).to.have.property('status').equal('Success');
        done();
      });
  });
  it('Should not update an entry with an invalid ID', (done) => {
    chai.request(server)
      .put('/api/v1/entries/35')
      .send(entry)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message').equal('Entry does not exist');
        expect(res.body).to.have.property('status').equal('error');
        done();
      });
  });
  it('Should not update an entry with incomplete fields', (done) => {
    chai.request(server)
      .put('/api/v1/entries/1')
      .send({
        userId: 8,
        title: 'The day I first ....',
        body: 'Paragraph ...',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status').equal('Failed');
        done();
      });
  });
  it('Should delete the entry with the specified id', (done) => {
    chai.request(server)
      .delete('/api/v1/entries/1')
      .end((err, res) => {
        expect(res.body.message).to.equal('Entry deleted successfully');
        expect(res.status).to.equal(200);
        expect(res.body.entry).to.have.property('title').equal(entry.title);
        expect(res.body.entry).to.have.property('body').equal(entry.body);
        expect(res.body.entry).to.have.property('userId').equal(entry.userId);
        expect(res.body.entry).to.have.property('date').equal(entry.date);
        expect(res.body.entry).to.have.property('id').equal(1);
        expect(res.body).to.have.property('status').equal('Success');
        done();
      });
  });
  it('Should not delete an entry with an invalid ID', (done) => {
    chai.request(server)
      .delete('/api/v1/entries/35')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message').equal('Entry does not exist');
        expect(res.body).to.have.property('status').equal('error');
        done();
      });
  });
});
