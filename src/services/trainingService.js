const { trainings, trainingIdSeq, users } = require('../data/inMemoryDb');
const dateFns = require('date-fns');

function addTraining(training) {
    trainings.push(training);
}

function getTrainingsByUser(userId) {
    return trainings.filter(t => t.userId === Number(userId));
}

function deleteTraining(trainingId, userId) {
    const idx = trainings.findIndex(t => t.id === Number(trainingId) && t.userId === Number(userId));
    if (idx === -1) return false;
    trainings.splice(idx, 1);
    return true;
}

function consolidatePace(userId) {
    const now = new Date();
    const userTrainings = trainings.filter(t => t.userId === Number(userId) && ['Moderado', 'Forte', 'Longo'].includes(t.tipoTreino) && t.dataHora && t.distancia && t.pace && dateFns.differenceInDays(now, new Date(t.dataHora)) <= 30);
    if (userTrainings.length === 0) return null;
    const avgPace = Math.round(userTrainings.reduce((acc, t) => acc + t.pace, 0) / userTrainings.length);
    const user = users.find(u => u.id === Number(userId));
    if (user) user.pace = avgPace;
    return avgPace;
}

function consolidateAllPaces() {
    const alunos = users.filter(u => u.tipo === 'aluno');
    return alunos.map(a => ({ id: a.id, usuario: a.usuario, pace: consolidatePace(a.id) }));
}

function groupByPace() {
    const alunos = users.filter(u => u.tipo === 'aluno' && typeof u.pace === 'number');
    const groups = {};
    alunos.forEach(a => {
        const interval = Math.floor(a.pace / 30) * 30;
        const key = `${interval}-${interval + 30}`;
        if (!groups[key]) groups[key] = [];
        groups[key].push(a);
    });
    return groups;
}

module.exports = { addTraining, getTrainingsByUser, deleteTraining, consolidatePace, consolidateAllPaces, groupByPace };