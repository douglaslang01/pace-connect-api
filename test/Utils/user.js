// Bibliotecas
const request = require('supertest');

//Aplicação
const app = require('../../src/app');

const postUser = async (bodyUser) =>
    await request(app)
        .post('/users/register')
        .set('Content-type', 'application/json')
        .send(bodyUser);

const postUsers = async (bodyUsers) => {
    if (Array.isArray(bodyUsers) && bodyUsers.length > 0) {
        bodyUsers.forEach(async user => {
            _ = await postUser(user);
        })
    }
}

module.exports = { postUser, postUsers }