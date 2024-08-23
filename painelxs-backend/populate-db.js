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

// Função para gerar um nome aleatório de produto
const getRandomProductName = () => {
  const products = ['Camiseta', 'Calça', 'Tênis', 'Jaqueta', 'Boné', 'Bolsa', 'Óculos', 'Relógio'];
  return products[Math.floor(Math.random() * products.length)];
};

// Função para gerar uma descrição aleatória
const getRandomDescription = () => {
  const descriptions = [
    'Produto de alta qualidade.',
    'Ótimo para o dia a dia.',
    'Desenvolvido com materiais premium.',
    'Confortável e elegante.',
    'A escolha perfeita para você.',
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

// Função para gerar um preço aleatório
const getRandomPrice = () => (Math.random() * (500 - 10) + 10).toFixed(2); // Preço entre 10 e 500

// Função para gerar uma quantidade em estoque aleatória
const getRandomStockQuantity = () => getRandomInt(0, 100); // Quantidade entre 0 e 100

// Inserir dados aleatórios
const insertRandomProducts = (numRecords) => {
  const stmt = db.prepare(`
    INSERT INTO produtos (nome, descricao, preco, quantidadeEstoque, dataCriacao)
    VALUES (?, ?, ?, ?, ?)
  `);

  let count = 0;

  const insertNext = () => {
    if (count < numRecords) {
      const nome = getRandomProductName();
      const descricao = getRandomDescription();
      const preco = getRandomPrice();
      const quantidadeEstoque = getRandomStockQuantity();
      const dataCriacao = getRandomDate();

      stmt.run(nome, descricao, preco, quantidadeEstoque, dataCriacao, (err) => {
        if (err) {
          console.error('Erro ao inserir dados:', err.message);
        } else {
          console.log(`Produto ${count + 1} inserido.`);
          count++;
          insertNext();
        }
      });
    } else {
      stmt.finalize(() => {
        console.log(`Dados aleatórios de produtos inseridos com sucesso.`);
        db.close();
      });
    }
  };

  insertNext();
};

// Inserir 10 registros aleatórios
insertRandomProducts(10);
