const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // Carregar variáveis de ambiente

// Criar a instância do aplicativo Express
const app = express();

// Configurar o middleware
app.use(cors({
  origin: 'http://localhost:3000', // Ajuste para a URL correta do frontend
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Configurar as rotas
const dashboardRoutes = require('./routes/dashboardRoutes');
const produtosRoutes = require('./routes/produtosRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');

// Usar as rotas
app.use('/dashboard', dashboardRoutes);
app.use('/produtos', produtosRoutes);
app.use('/usuarios', usuariosRoutes);

// Iniciar o servidor
const port = process.env.PORT || 3001; // Usar variável de ambiente para a porta
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
