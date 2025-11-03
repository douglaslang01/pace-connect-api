// Biblioteca
const request = require('supertest');
const { expect } = require('chai');

// Aplicação
const app = require('../../../src/app');
const testCases = require('../../fixtures/login.json');

describe('Login do Usuário - Data Driven', () => {
  testCases.forEach(tc => {
    it(`${tc.id}: ${tc.description}`, async () => {
      
      const res = await request(app)
        .post('/users/login')
        .send(tc.payload);

      expect(res.status).to.equal(tc.expected.status);
      if (tc.expected.hasToken === false) expect(res.body).to.not.have.property('token');
      if (tc.expected.errorMsg) expect(res.body.error).to.match(new RegExp(tc.expected.errorMsg, 'i'));
    });
  });
});
