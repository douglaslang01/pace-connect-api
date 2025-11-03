//Biblioteca
const request = require('supertest');
const { expect } = require('chai');

//Aplicação
const app = require('../../../src/app');
const auth = require('../../Utils/authentication')
const testCases = require('../../fixtures/listUsers.json');

describe(' GET /users - Data Driven', () => {
    let token;
    before(async () => {
        token = await auth.getToken();
    });

    testCases.forEach(tc => {
        it(`${tc.id}: ${tc.description}`, async () => {
            let req = request(app).get('/users');

            if (tc.headers && tc.headers.Authorization) {
                req = req.set('Authorization', tc.headers.Authorization.replace('<token válido>', token));
            }

            if (tc.query) {
                req = req.query(tc.query);
            }
            const res = await req;

            expect(res.status).to.equal(tc.expected.status);
            if (tc.expected.bodyType === 'array') expect(res.body).to.be.an('array');
            if (tc.expected.bodyType === 'object') expect(res.body).to.be.an('object');
            if (tc.expected.bodyLength !== undefined) expect(res.body.length).to.equal(tc.expected.bodyLength);
            if (tc.expected.errorMsg) expect(JSON.stringify(res.body)).to.match(new RegExp(tc.expected.errorMsg, 'i'));
            if (tc.expected.fields && res.body.length > 0) {
                tc.expected.fields.forEach(field => {
                    expect(res.body[0]).to.have.property(field.name).and.to.be.a(field.type);
                });
            }
        });
    });
});

