const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');

// Cria a tabela de usuários se não existir
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      email TEXT UNIQUE,
      senha TEXT,
      dataCriacao TEXT
    )
  `);
});


module.exports = db;
