const { getAllUsers, getUserById } = require('../services/userService');

exports.getAllUsers = (req, res) => {
  res.json(getAllUsers());
};

exports.getUserById = (req, res) => {
  const user = getUserById(req.params.id);
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
  res.json(user);
};