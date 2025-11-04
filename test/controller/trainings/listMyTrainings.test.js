const request = require('supertest');
const { expect } = require('chai');

const app = require('../../../src/app');
const auth = require('../../Utils/authentication');
const { postWorkouts, getMyWorkouts } = require('../../Utils/workout');
const trainingsArray = require('../../fixtures/postTrainings.json');
const testCases = require('../../fixtures/trainings/listMyTrainings.json');

describe('Consulta de Treinos do Usuário Logado - Data Driven: GET /trainings/mine', () => {
  let token;
  before(async () => {
    token = await auth.getToken(); //login do aluno1

    //Adiciona treinos do aluno1
    await postWorkouts(token, trainingsArray);
  });

  testCases.forEach(tc => {
    it(`${tc.id}: ${tc.description}`, async () => {
      let req = request(app).get('/trainings/mine');

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

  it('CT30 - Busca treinos do usuário logado', async () => {
    const myWorkouts = (await getMyWorkouts(token)).body.length;

    //faz o login e posta treinos de um usuario do tipo treinador
    const trainerToken = await auth.getTokenWithCredendials('treinador1', '123456');
    await postWorkouts(trainerToken, trainingsArray);

    const res = await getMyWorkouts(token);

    expect(res.status).to.equal(200);
    expect(res.body.length).to.equal(myWorkouts);
  });
});
