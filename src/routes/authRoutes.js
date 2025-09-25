// src/routes/authRoutes.js

const express = require('express');
const router = express.Router();

// Esta linha importa o objeto com as funções que exportamos no outro arquivo.
const authController = require('../controllers/authController');

// Aqui, authController.register DEVE ser uma função.
router.post('/register', authController.register);

// O mesmo para authController.login.
router.post('/login', authController.login);

module.exports = router;