const sqlite3 = require('sqlite3').verbose();

// Cria ou abre o arquivo de banco de dados
const db = new sqlite3.Database('./data.db');

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
  `, (err) => {
    if (err) {
      console.error('Erro ao criar tabela:', err.message);
    } else {
      console.log('Tabela criada com sucesso.');
    }
  });
});

// Fecha o banco de dados
db.close();
