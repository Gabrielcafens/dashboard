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

// Função para obter IDs de produtos existentes
const getProductIds = (callback) => {
  db.all('SELECT id FROM produtos', [], (err, rows) => {
    if (err) {
      throw err;
    }
    callback(rows.map(row => row.id));
  });
};

// Função para obter IDs de usuários existentes
const getUserIds = (callback) => {
  db.all('SELECT id FROM usuarios', [], (err, rows) => {
    if (err) {
      throw err;
    }
    callback(rows.map(row => row.id));
  });
};

// Inserir dados aleatórios de pedidos
const insertRandomOrders = (numRecords) => {
  getProductIds((productIds) => {
    getUserIds((userIds) => {
      const stmt = db.prepare(`
        INSERT INTO pedidos (cliente_id, produto_id, quantidade, dataPedido)
        VALUES (?, ?, ?, ?)
      `);

      let count = 0;

      const insertNext = () => {
        if (count < numRecords) {
          const cliente_id = userIds[getRandomInt(0, userIds.length - 1)];
          const produto_id = productIds[getRandomInt(0, productIds.length - 1)];
          const quantidade = getRandomInt(1, 5); // Quantidade entre 1 e 5
          const dataPedido = getRandomDate();

          stmt.run(cliente_id, produto_id, quantidade, dataPedido, (err) => {
            if (err) {
              console.error('Erro ao inserir dados:', err.message);
            } else {
              console.log(`Pedido ${count + 1} inserido.`);
              count++;
              insertNext();
            }
          });
        } else {
          stmt.finalize(() => {
            console.log(`Dados aleatórios de pedidos inseridos com sucesso.`);
            db.close();
          });
        }
      };

      insertNext();
    });
  });
};

// Inserir 10 registros aleatórios de pedidos
insertRandomOrders(10);
