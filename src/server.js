// src/server.js

// --- 1. IMPORTAÇÕES ---
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

// --- 2. INICIALIZAÇÃO DO APP ---
const app = express();


// --- 3. MIDDLEWARES ---
// Middlewares são funções que são executadas para cada requisição que chega.
// A ORDEM DELES É MUITO IMPORTANTE.

// Habilita o CORS (Cross-Origin Resource Sharing) para todas as rotas.
// Deve vir antes da declaração das rotas para que funcione corretamente.
app.use(cors());

// Habilita o Express para interpretar o corpo (body) das requisições em formato JSON.
// Essencial para receber dados de formulários (POST, PUT, etc.).
app.use(express.json());


// --- 4. ROTAS ---
// O Express irá direcionar as requisições para os arquivos correspondentes
// com base no início da URL.
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/powerbi', require('./routes/powerbiRoutes'));
app.use('/api/panels', require('./routes/panelRoutes.js'));
app.use('/api/users', require('./routes/userRoutes.js'));


// --- 5. INICIALIZAÇÃO DO SERVIDOR ---
// Define a porta a partir do arquivo .env, ou usa 5000 como padrão.
const PORT = process.env.PORT || 5000;

// Inicia o servidor e o faz "ouvir" por requisições na porta definida.
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));