const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
require('dotenv').config(); // Carregar variáveis de ambiente

// Criar a instância do aplicativo Express
const app = express();
app.use(express.json()); // Usado para análise de JSON
app.use(bodyParser.urlencoded({ extended: true })); // Análise de dados de formulários

// Configurar o middleware
app.use(cors({
  origin: 'http://localhost:3000', // Ajuste para a URL correta do frontend
}));

// Configurar as rotas
const dashboardRoutes = require('./routes/dashboardRoutes');
const produtosRoutes = require('./routes/produtosRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');

// Usar as rotas
app.use('/dashboard', dashboardRoutes);
app.use('/produtos', produtosRoutes);
app.use('/usuarios', usuariosRoutes);

// Funções para salvar e carregar o token
const saveToken = (token) => {
  const filePath = path.join(__dirname, 'utils', 'token.json'); // Caminho do arquivo token.json
  fs.writeFileSync(filePath, JSON.stringify({ token }));
};

const getToken = () => {
  const filePath = path.join(__dirname, 'utils', 'token.json'); // Caminho do arquivo token.json
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf8');
    const parsedData = JSON.parse(data);
    return parsedData.token;
  }
  return null;
};

// Testar o método getToken
const token = getToken();
if (token) {
  console.log(`Token encontrado: ${token}`);
} else {
  console.log('Nenhum token encontrado');
}

// Inicializar o servidor
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
// Exemplo com Express e um banco de dados fictício
app.delete('/usuarios/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    console.log(`Tentando excluir o usuário com ID: ${userId}`);

    // Suponha que você esteja usando um ORM ou diretamente o banco de dados
    const result = await db.query('DELETE FROM usuarios WHERE id = ?', [userId]);

    if (result.affectedRows > 0) {
      console.log(`Usuário com ID ${userId} excluído com sucesso.`);
      res.status(200).send('Usuário excluído com sucesso.');
    } else {
      console.log(`Nenhum usuário encontrado com ID ${userId}.`);
      res.status(404).send('Usuário não encontrado.');
    }
  } catch (error) {
    console.error(`Erro ao excluir o usuário com ID ${userId}:`, error);
    res.status(500).send('Erro ao excluir o usuário.');
  }
});
