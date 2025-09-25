// src/routes/powerbiRoutes.js

const express = require('express');
const router = express.Router();

// Importando os componentes necessários
const powerbiController = require('../controllers/powerbiController');
const authMiddleware = require('../middleware/authMiddleware');

// Definindo a rota
// Quando uma requisição GET chegar em /api/powerbi/embed-info:
// 1. O authMiddleware será executado primeiro para verificar o login.
// 2. Se o login for válido, o controller powerbiController.getEmbedInfo será executado.
router.get('/embed-info', authMiddleware, powerbiController.getEmbedInfo);

// ESSA LINHA É A MAIS IMPORTANTE PARA CORRIGIR O ERRO
// Ela exporta o objeto router configurado para ser usado no server.js
module.exports = router;