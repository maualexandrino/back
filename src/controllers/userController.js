// Arquivo: backend/src/controllers/userController.js

const db = require('../db');

/**
 * Controller para buscar todos os usuários do banco de dados.
 * Retorna apenas o ID e o email para popular a página de Admin.
 */
exports.getAllUsers = async (req, res) => {
    try {
        console.log("Buscando lista de usuários...");
        const users = await db.query("SELECT id, email FROM users ORDER BY email");
        console.log(`Encontrados ${users.rows.length} usuários.`);
        res.status(200).json(users.rows);
    } catch (err) {
        console.error("ERRO em getAllUsers:", err.message); 
        res.status(500).send('Erro no servidor ao buscar usuários.');
    }
};