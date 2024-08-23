const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Criar a instância do aplicativo Express
const app = express();

// Configurar o middleware
app.use(cors());
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
const port = 3001;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
