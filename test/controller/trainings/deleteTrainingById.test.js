//Biblioteca
const request = require('supertest');
const { expect } = require('chai');

//Aplicação
const app = require('../../../src/app');
const auth = require('../../Utils/authentication');
const { postWorkouts } = require('../../Utils/workout');
const trainingsArray = require('../../fixtures/postTrainings.json');
const testCases = require('../../fixtures/trainings/deleteTrainingById.json');

describe('Exclusão de Treinos - Data Driven: DELETE /trainings/{id}', () => {
  let token;
  before(async () => {
    token = await auth.getToken(); //login do aluno1

    //Adiciona treinos do aluno1
    await postWorkouts(token, trainingsArray);
  });

  testCases.forEach(tc => {
    it(`${tc.id}: ${tc.description}`, async () => {
      let req = request(app).delete(`/trainings/${tc.trainingId}`);

      if (tc.headers && tc.headers.Authorization) {
        req = req.set('Authorization', tc.headers.Authorization.replace('<token válido>', token));
      }

      const res = await req;

      expect(res.status).to.equal(tc.expected.status);
      if (tc.expected.errorMsg) expect(res.body.error).to.equal(tc.expected.errorMsg);
    });
  });
});
