const request = require('supertest');
const { expect } = require('chai');


const app = require('../../../src/app');
const auth = require('../../Utils/authentication');
const { postWorkoutsbByUser } = require('../../Utils/workout');
const testCases = require('../../fixtures/trainings/consolidatePace.json');


describe('Consolidação do Pace por Aluno - Data Driven: GET /trainings/consolidate/{userId}', () => {
  let token;
  before(async () => {
    token = await auth.getToken(); //login do aluno1
  })

  testCases.forEach(tc => {
    it(`${tc.id}: ${tc.description}`, async () => {
      // Setup: criar treinos se necessário
      if (tc.trainings && tc.trainings.length > 0) {
        await postWorkoutsbByUser(token, tc.userId, tc.trainings);
      }

      let req = request(app).get(`/trainings/consolidate/${tc.userId}`);
      if (tc.headers && tc.headers.Authorization) {
        req = req.set('Authorization', tc.headers.Authorization.replace('<token válido>', token));
      }

      const res = await req;

      expect(res.status).to.equal(tc.expected.status);
      if (tc.expected.errorMsg) expect(res.body.error).to.equal(tc.expected.errorMsg);
      if (tc.expected.pace !== undefined) {
        if (tc.expected.pace === null) {
          expect(res.body.pace).to.be.oneOf([null, undefined]);
        } else {
          expect(res.body.pace).to.equal(tc.expected.pace);
        }
      }
    });
  });
});
