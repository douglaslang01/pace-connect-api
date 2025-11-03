// Bibliotecas
const request = require('supertest');

//Aplicação
const app = require('../../src/app');
const postLogin = require('../fixtures/postLogin.json');

const getToken = async () => await getTokenWithCredendials('aluno1', '123456');

const getTokenWithCredendials = async (user, password) => {
    const bodyLogin = { ...postLogin };
    bodyLogin.username = user;
    bodyLogin.password = password;

    const response = await request(app)
        .post('/users/login')
        .set('Content-Type', 'application/json')
        .send(bodyLogin);

    return response.body.token;
}

module.exports = { getToken, getTokenWithCredendials }