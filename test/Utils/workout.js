// Bibliotecas
const request = require('supertest');

//Aplicação
const app = require('../../src/app');

const postWorkout = async (token, bodyWorkout) =>
    await request(app)
        .post('/trainings')
        .set('Authorization', `Bearer ${token}`)
        .set('Content-type', 'application/json')
        .send(bodyWorkout);

const postWorkouts = async (token, bodyWorkouts) => {
    if (Array.isArray(bodyWorkouts) && bodyWorkouts.length > 0) {
        bodyWorkouts.forEach(async workout => {
            _ = await postWorkout(token, workout);
        })
    }
};

const getMyWorkouts = async (token) =>
    await request(app)
        .get('/trainings/mine')
        .set('Authorization', `Bearer ${token}`);

const deleteWorkout = async (token, id) =>
    await request(app)
        .delete(`/trainings/user/${id}`)
        .set('Authorization', `Bearer ${token}`);

const deleteWorkouts = async (token, bodyWorkouts) => {
    if (Array.isArray(bodyWorkouts) && bodyWorkouts.length > 0) {
        bodyWorkouts.forEach(async workout => {
            _ = await deleteWorkout(token, workout.id);
        })
    }
};


module.exports = { postWorkout, postWorkouts, getMyWorkouts, deleteWorkout, deleteWorkouts }
