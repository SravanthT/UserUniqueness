const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./index.js');
const db = require('./db.js');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Registration Routes', () => {
  
  for(let i=0;i<db.database.length;i++){
    let doc = db.database[i]
      if(!doc.cc){
          describe('POST /register', () => {
            it('should register a new user', async () => {
              const res = await chai.request(app)
                .post('/register')
                .send(doc);
              expect(res.status).to.equal(200);
              expect(res.body.message).to.equal('User registered successfully');
            });

            it('should return 400 if user already exists', async () => {
              // Register a user first
              await chai.request(app)
                .post('/register')
                .send(doc);

              // Attempt to register the same user again
              const res = await chai.request(app)
                .post('/register')
                .send(doc);
              expect(res.status).to.equal(400);
              expect(res.body.message).to.equal('User already exists');
              
            });
          });
      } else {
          describe('POST /api/register', () => {
            it('should register a new user', async () => {
              const res = await chai.request(app)
                .post('/api/register')
                .send(doc);
              expect(res.status).to.equal(200);
              expect(res.body.message).to.equal('User registered successfully');
            });

            it('should return 400 if user already exists', async () => {
              // Register a user first
              await chai.request(app)
                .post('/api/register')
                .send(doc);

              // Attempt to register the same user again
              const res = await chai.request(app)
                .post('/api/register')
                .send(doc);
              expect(res.status).to.equal(400);
              expect(res.body.message).to.equal('User already exists');
              
            });
          });
        }
      }
});
