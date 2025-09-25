// src/routes/panelRoutes.js
const express = require('express');
const router = express.Router();
const panelController = require('../controllers/panelController');
const authMiddleware = require('../middleware/authMiddleware');

// Rotas protegidas (só usuários logados podem gerenciar painéis)
router.use(authMiddleware);

router.post('/', panelController.createPanel);
router.get('/', panelController.getAllPanels);
router.post('/assign', panelController.assignPanelToUser);

module.exports = router;