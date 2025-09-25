// src/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
  // Pega o token do cabeçalho de autorização
  const authHeader = req.header('Authorization');

  // Verifica se o cabeçalho existe
  if (!authHeader) {
    return res.status(401).json({ msg: 'Nenhum token, autorização negada.' });
  }

  try {
    // O token vem no formato "Bearer <token>", então pegamos a segunda parte
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ msg: 'Formato de token inválido.' });
    }

    // Verifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Adiciona o payload do usuário ao objeto da requisição
    req.user = decoded.user;
    next(); // Passa para a próxima função (o controller)
  } catch (err) {
    res.status(401).json({ msg: 'Token não é válido.' });
  }
};