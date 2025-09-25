// src/controllers/panelController.js
const db = require('../db');

// Criar um novo painel
exports.createPanel = async (req, res) => {
    const { name, embed_url } = req.body;
    if (!name || !embed_url) {
        return res.status(400).json({ error: 'Nome e URL do painel são obrigatórios.' });
    }
    try {
        const newPanel = await db.query(
            "INSERT INTO panels (name, embed_url) VALUES ($1, $2) RETURNING *",
            [name, embed_url]
        );
        res.status(201).json(newPanel.rows[0]);
    } catch (err) {
        console.error("ERRO em createPanel:", err.message);
        res.status(500).send('Erro no servidor');
    }
};

// Listar todos os painéis
exports.getAllPanels = async (req, res) => {
    try {
        console.log("Buscando lista de painéis..."); // Log para depuração
        const panels = await db.query("SELECT * FROM panels ORDER BY name");
        console.log(`Encontrados ${panels.rows.length} painéis.`); // Log de sucesso
        res.status(200).json(panels.rows);
    } catch (err) {
        // Log de erro detalhado no terminal do backend
        console.error("ERRO em getAllPanels:", err.message);
        res.status(500).send('Erro no servidor ao buscar painéis.');
    }
};

// Associar um painel a um usuário
exports.assignPanelToUser = async (req, res) => {
    const { user_id, panel_id } = req.body;
    if (!user_id || !panel_id) {
        return res.status(400).json({ error: 'ID do usuário e ID do painel são obrigatórios.' });
    }
    try {
        await db.query(
            "INSERT INTO user_panels (user_id, panel_id) VALUES ($1, $2)",
            [user_id, panel_id]
        );
        res.status(201).json({ msg: 'Painel associado ao usuário com sucesso.' });
    } catch (err) {
        console.error("ERRO em assignPanelToUser:", err.message);
        if (err.code === '23505') {
            return res.status(400).json({ error: 'Este painel já está associado a este usuário.' });
        }
        res.status(500).send('Erro no servidor');
    }
};