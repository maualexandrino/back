// src/controllers/authController.js

const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// A palavra "exports." antes do nome da função é crucial.
exports.register = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        const newUser = await db.query(
            "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email",
            [email, password_hash]
        );

        res.status(201).json(newUser.rows[0]);
    } catch (err) {
        console.error("ERRO NO REGISTRO:", err.message); // Log de erro mais detalhado
        if (err.code === '23505') {
            return res.status(400).json({ error: 'Este email já está em uso.' });
        }
        res.status(500).send('Erro no servidor');
    }
};

// A palavra "exports." aqui também é crucial.
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (userResult.rows.length === 0) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        const user = userResult.rows[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        const payload = {
            user: {
                id: user.id,
                email: user.email
            }
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });

    } catch (err) {
        console.error("ERRO NO LOGIN:", err.message); // Log de erro mais detalhado
        res.status(500).send('Erro no servidor');
    }
};