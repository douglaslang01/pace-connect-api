const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users, userIdSeq } = require('../data/inMemoryDb');
const { SECRET } = require('../middleware/authMiddleware');
const User = require('../models/userModel');

function registerUser(data) {
    const hash = bcrypt.hashSync(data.senha, 8);
    const user = new User({ ...data, id: userIdSeq, senha: hash });
    users.push(user);
    require('../data/inMemoryDb').userIdSeq++;
    return user;
}

function loginUser(usuario, senha) {
    const user = users.find(u => u.usuario === usuario);
    if (!user || !bcrypt.compareSync(senha, user.senha)) return null;
    const token = jwt.sign({ id: user.id, tipo: user.tipo }, SECRET, { expiresIn: '1d' });
    return token;
}

module.exports = { registerUser, loginUser };