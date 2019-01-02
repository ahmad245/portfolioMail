require('./index.js');
const express = require('express');
const supertest = require('supertest');

describe('express-async-errors', () => {
  it('propagates routes errors to error handler', () => {
    const app = express();

    app.get('/test', async () => {
      throw new Error('error');
    });

    app.use((err, req, res, next) => {
      res.status(495);
      res.end();
    });

    return supertest(app)
      .get('/test')
      .expect(495);
  });

  it('propagates regular middleware errors too', () => {
    const app = express();

    app.use(async () => {
      throw new Error('error');
    });

    app.get('/test', async () => {
      throw new Error('error');
    });


    app.use((err, req, res, next) => {
      res.status(495);
      res.end();
    });

    return supertest(app)
      .get('/test')
      .expect(495);
  });

  it('and propagates error middleware errors too', () => {
    const app = express();

    app.get('/test', async () => {
      throw new Error('error');
    });

    app.use(async (err, req, res, next) => {
      throw new Error('error');
    });

    app.use((err, req, res, next) => {
      res.status(495);
      res.end();
    });

    return supertest(app)
      .get('/test')
      .expect(495);
  });
});
