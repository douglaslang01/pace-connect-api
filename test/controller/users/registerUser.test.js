// Biblioteca
const request = require('supertest');
const { expect } = require('chai');

// Aplicação
const app = require('../../../src/app');
const testCases = require('../../fixtures/users/registerUser.json');

describe('Registro de Usuário - Data Driven: POST /users/register', () => {
  testCases.forEach(tc => {
    it(`${tc.id}: ${tc.description}`, async () => {

      const res = await request(app)
        .post('/users/register')
        .send(tc.body);

      expect(res.status).to.equal(tc.expected.status);
      if (tc.expected.hasId) expect(res.body).to.have.property('id');
      if (tc.expected.hasToken === false) expect(res.body).to.not.have.property('token');
      if (tc.expected.error) expect(res.body).to.have.property('error');
      if (tc.expected.errorMsg) expect(res.body.error).to.equal(tc.expected.errorMsg);
    });
  });
});
