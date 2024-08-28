const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');

// Cria a tabela de produtos se não existir
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      descricao TEXT,
      preco REAL NOT NULL,
      quantidadeEstoque INTEGER NOT NULL,
      dataCriacao TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Erro ao criar a tabela de produtos:', err);
    } else {
      console.log('Tabela de produtos criada com sucesso.');
    }
  });
});

module.exports = db;
