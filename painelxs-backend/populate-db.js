const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');

// Função para gerar um valor aleatório
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Função para gerar uma data aleatória
const getRandomDate = () => {
  const start = new Date(2023, 0, 1); // Data de início
  const end = new Date(); // Data final (hoje)
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
};

// Inserir dados aleatórios
const insertRandomData = (numRecords) => {
  const stmt = db.prepare(`
    INSERT INTO dashboard (totalVendas, novosClientes, totalPedidosHoje, totalPedidos30Dias, data)
    VALUES (?, ?, ?, ?, ?)
  `);

  let count = 0;

  const insertNext = () => {
    if (count < numRecords) {
      const totalVendas = getRandomInt(10000, 50000);
      const novosClientes = getRandomInt(50, 300);
      const totalPedidosHoje = getRandomInt(10, 100);
      const totalPedidos30Dias = getRandomInt(1000, 3000);
      const data = getRandomDate();

      stmt.run(totalVendas, novosClientes, totalPedidosHoje, totalPedidos30Dias, data, (err) => {
        if (err) {
          console.error('Erro ao inserir dados:', err.message);
        } else {
          console.log(`Registro ${count + 1} inserido.`);
          count++;
          insertNext();
        }
      });
    } else {
      stmt.finalize(() => {
        console.log(`Dados aleatórios inseridos com sucesso.`);
        db.close();
      });
    }
  };

  insertNext();
};

// Inserir 10 registros aleatórios
insertRandomData(10);
