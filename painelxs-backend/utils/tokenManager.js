const fs = require('fs');
const path = './data/token.txt'; // Caminho para o arquivo token.txt

// Função para salvar o token
const saveToken = (token) => {
  fs.writeFileSync(path, token);
};

// Função para ler o token
const getToken = () => {
  if (fs.existsSync(path)) {
    return fs.readFileSync(path, 'utf8');
  }
  return null;
};

module.exports = { saveToken, getToken };
