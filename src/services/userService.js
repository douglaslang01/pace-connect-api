const { users } = require('../data/inMemoryDb');

function getAllUsers() {
  return users;
}

function getUserById(id) {
  return users.find(u => u.id === Number(id));
}

module.exports = { getAllUsers, getUserById };