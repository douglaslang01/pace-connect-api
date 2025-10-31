const { registerUser, loginUser } = require('../services/authService');

exports.register = (req, res) => {
  const user = registerUser(req.body);
  res.status(201).json({ id: user.id });
};

exports.login = (req, res) => {
  const { usuario, senha } = req.body;
  const token = loginUser(usuario, senha);
  if (!token) return res.status(401).json({ error: 'Credenciais inválidas' });
  res.json({ token });
};