const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db'); // Use um arquivo de banco de dados SQLite

// Cria a tabela se não existir
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS dashboard (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      totalVendas INTEGER,
      novosClientes INTEGER,
      totalPedidosHoje INTEGER,
      totalPedidos30Dias INTEGER,
      data TEXT
    )
  `);
});

module.exports = db;
