// Arquivo: backend/src/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Aplica o middleware de autenticação a todas as rotas deste arquivo.
// Ou seja, apenas usuários logados podem listar outros usuários.
router.use(authMiddleware);

// Define que uma requisição GET para a raiz ('/') desta rota
// deve executar a função getAllUsers do controller.
// A URL completa será GET /api/users/
router.get('/', userController.getAllUsers);

// Exporta o router configurado para ser usado no server.js
module.exports = router;