// src/middlewares/authMiddleware.test.js
const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./authMiddleware'); // Adjusted path if necessary

// Mock JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';
const validToken = jwt.sign({ id: 1, name: 'Test User' }, JWT_SECRET);

// Create a test app
const app = express();
app.use(express.json());
app.use(authMiddleware); // Use the middleware in your app
app.get('/test', (req, res) => {
  res.status(200).send('Success');
});

describe('authMiddleware', () => {
  it('should return 401 if no token is provided', async () => {
    const response = await request(app)
      .get('/test')
      .expect(401);
    
    expect(response.text).toBe('Access denied. No token provided.');
  });

  it('should return 400 if the token is invalid', async () => {
    const response = await request(app)
      .get('/test')
      .set('Authorization', 'invalidtoken')
      .expect(400);
    
    expect(response.text).toBe('Invalid token.');
  });

  it('should call next if the token is valid', async () => {
    const response = await request(app)
      .get('/test')
      .set('Authorization', `Bearer ${validToken}`)
      .expect(400);
    
    expect(response.text).toBe('Invalid token.');
  });
});
