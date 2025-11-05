// Bibliotecas
const request = require('supertest');

//Aplicação
const app = require('../../src/app');
const { getUser, postUser } = require('./user');
const { getTokenWithCredendials } = require('./authentication');

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

const postWorkoutsbByUser = async (token, userId, bodyWorkouts) => {
    const userResponse = await getUser(token, userId);
    if (userResponse.status != 200) {
        _ = await postUser(`
            {
                "id": ${userId},
                "usuario": "aluno${userId}",
                "senha": "123456",
                "nascimento": "2000-01-01",
                "sexo": "M",
                "experiencia": "iniciante",
                "objetivo": "saúde",
                "pace": 300,
                "tipo": "aluno"
            } `);
    }

    const userToken = await getTokenWithCredendials(userResponse.body.usuario, userResponse.body.senha);
    _ = await postWorkouts(userToken, bodyWorkouts);
}

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


module.exports = { postWorkout, postWorkouts, postWorkoutsbByUser, getMyWorkouts, deleteWorkout, deleteWorkouts }
