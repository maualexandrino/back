// src/controllers/powerbiController.js
const db = require('../db');

exports.getEmbedInfo = async (req, res) => {
  try {
    // O ID do usuário logado vem do middleware de autenticação (req.user.id)
    const userId = req.user.id;

    // Busca no banco de dados o primeiro painel associado a este usuário
    const panelResult = await db.query(
      `SELECT p.embed_url 
       FROM panels p
       JOIN user_panels up ON p.id = up.panel_id
       WHERE up.user_id = $1
       LIMIT 1`,
      [userId]
    );

    // Verifica se o usuário tem algum painel associado
    if (panelResult.rows.length === 0) {
      return res.status(404).json({ error: "Nenhum painel encontrado para este usuário." });
    }

    // Envia a URL encontrada no banco de dados
    res.status(200).json({
      embedUrl: panelResult.rows[0].embed_url,
    });
  } catch (error) {
    console.error("Erro ao buscar informações do painel:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};