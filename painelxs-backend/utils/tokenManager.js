const fs = require('fs');
const path = './token.json';

function saveToken(token) {
  fs.writeFileSync(path, JSON.stringify({ token }));
  console.log(`Salvando token no caminho: ${path}`);
}

function getToken() {
  if (fs.existsSync(path)) {
    const data = fs.readFileSync(path);
    const json = JSON.parse(data);
    console.log(`Lendo token do caminho: ${path}`);
    return json.token;
  }
  return null;
}

module.exports = { saveToken, getToken };
