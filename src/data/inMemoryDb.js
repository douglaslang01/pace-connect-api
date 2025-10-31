const bcrypt = require('bcryptjs');
let userIdSeq = 1;
let trainingIdSeq = 1;

const users = [
    {
        id: userIdSeq++,
        usuario: 'aluno1',
        senha: bcrypt.hashSync('123456', 8),
        nascimento: '2000-01-01',
        sexo: 'M',
        experiencia: 'iniciante',
        objetivo: 'saúde',
        pace: 300,
        tipo: 'aluno'
    },
    {
        id: userIdSeq++,
        usuario: 'treinador1',
        senha: bcrypt.hashSync('123456', 8),
        nascimento: '1980-01-01',
        sexo: 'M',
        experiencia: 'avançado',
        objetivo: 'performance',
        pace: 240,
        tipo: 'treinador'
    }
];
const trainings = [];

module.exports = { users, trainings, userIdSeq, trainingIdSeq };