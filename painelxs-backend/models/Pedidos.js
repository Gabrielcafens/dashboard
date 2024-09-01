const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');

// Cria a tabela de pedidos se não existir
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS pedidos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      produto_id INTEGER NOT NULL,
      quantidade INTEGER NOT NULL,
      usuario_id INTEGER NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error('Erro ao criar a tabela de pedidos:', err);
    } else {
      console.log('Tabela de pedidos criada com sucesso.');
    }
  });
});

module.exports = db;
