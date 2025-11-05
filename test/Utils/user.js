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

const getUser = async (token, id) =>
    await request(app)
        .post(`/users/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .set('Content-type', 'application/json');

module.exports = { postUser, postUsers, getUser }