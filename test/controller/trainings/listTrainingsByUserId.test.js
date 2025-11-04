//Biblioteca
const request = require('supertest');
const { expect } = require('chai');

//Aplicação
const app = require('../../../src/app');
const auth = require('../../Utils/authentication');
const { postWorkouts } = require('../../Utils/workout');
const trainingsArray = require('../../fixtures/postTrainings.json');
const testCases = require('../../fixtures/trainings/listTrainingsByUserId.json');

describe('Consulta de Treinos por ID do Usuário - Data Driven: GET /trainings/user/{userId}', () => {
  let token;
  before(async () => {
    token = await auth.getToken(); //login do aluno1 (ID: 1)

    //Adiciona treinos do aluno1 (ID: 1)
    await postWorkouts(token, trainingsArray);
  });

  testCases.forEach(tc => {
    it(`${tc.id}: ${tc.description}`, async () => {
      let req = request(app).get(`/trainings/user/${tc.userId}`);

      if (tc.headers && tc.headers.Authorization) {
        req = req.set('Authorization', tc.headers.Authorization.replace('<token válido>', token));
      }

      const res = await req;

      expect(res.status).to.equal(tc.expected.status);
      if (tc.expected.bodyType === 'array') expect(res.body).to.be.an('array');
      if (tc.expected.bodyLength !== undefined) expect(res.body.length).to.equal(tc.expected.bodyLength);
      if (tc.expected.errorMsg) expect(res.body.error).to.equal(tc.expected.errorMsg);
      if (tc.expected.fields && res.body.length > 0) {
        tc.expected.fields.forEach(field => {
          expect(res.body[0]).to.have.property(field.name).and.to.be.a(field.type);
        });
      }
    });
  });
});
