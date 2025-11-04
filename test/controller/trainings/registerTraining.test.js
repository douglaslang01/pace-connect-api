//Biblioteca
const request = require('supertest');
const { expect } = require('chai');

//Aplicação
const app = require('../../../src/app');
const auth = require('../../Utils/authentication')
const testCases = require('../../fixtures/trainings/registerTraining.json');

describe('Registro de Treinos - Data Driven: POST /trainings', () => {
    let token;
    before(async () => {
        token = await auth.getToken();
    });

    testCases.forEach(tc => {
        it(`${tc.id}: ${tc.description}`, async () => {
            let req = request(app).post('/trainings');

            if (tc.headers && tc.headers.Authorization) {
                req = req.set('Authorization', tc.headers.Authorization.replace('<token válido>', token));
            }

            req = req.send(tc.body);
            const res = await req;

            expect(res.status).to.equal(tc.expected.status);
            if (tc.expected.bodyType === 'object') expect(res.body).to.be.an('object');
            if (tc.expected.errorMsg) expect(res.body.error).to.equal(tc.expected.errorMsg);
            if (tc.expected.fields) {
                tc.expected.fields.forEach(field => {
                    expect(res.body).to.have.property(field.name).and.to.be.a(field.type);
                });
            }
        });
    });
});
