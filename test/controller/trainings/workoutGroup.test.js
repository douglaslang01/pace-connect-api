const request = require('supertest');
const { expect } = require('chai');

const app = require('../../../src/app');
const auth = require('../../Utils/authentication');
const { postUsers } = require('../../Utils/user');
const testCases = require('../../fixtures/trainings/workoutGroup.json');

describe('Feature: Agrupamento de alunos por pace', () => {
    describe('Data Driven: GET /trainings/group', () => {
        let token;
        before(async () => {
            token = await auth.getToken(); //login do aluno1
        });

        testCases.forEach(tc => {

            it(`${tc.id}: ${tc.description}`, async () => {

                if (tc.setup) await postUsers(tc.setup); // Adiciona usuarios com pace diferentes abordando a tecnica de valor limite

                let req = request(app).get('/trainings/group');
                if (tc.headers && tc.headers.Authorization) {
                    req = req.set('Authorization', tc.headers.Authorization.replace('<token válido>', token));
                }
                const res = await req;


                expect(res.status).to.equal(tc.expected.status);
                if (tc.expected.errorMsg) expect(res.body.error).to.equal(tc.expected.errorMsg);
                if (tc.expected.bodyType === 'object') expect(res.body).to.be.an('object');
                if (tc.expected.groupPaceValidation) {
                    Object.keys(res.body).forEach(groupKey => {
                        const [start, end] = groupKey.split('-').map(Number);
                        res.body[groupKey].forEach(student => {
                            expect(student.pace).to.be.greaterThanOrEqual(start);
                            expect(student.pace).to.be.lessThan(end);
                        })
                    });
                }
                if (tc.expected.intervalSize) {
                    Object.keys(res.body).forEach(groupKey => {
                        const [start, end] = groupKey.split('-').map(Number);
                        expect(end - start).to.equal(tc.expected.intervalSize);
                    });
                }
            });
        });
    });
});
