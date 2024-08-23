const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors'); // Importe o pacote CORS
const app = express();
const port = 3001;

// Middleware para parsear JSON
app.use(express.json());

// Configuração do CORS
app.use(cors({
  origin: 'http://localhost:3000', // Substitua pela URL do seu frontend
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database('./data.db');

// Rotas para o Dashboard

// Create - Adicionar um novo registro no dashboard
app.post('/dashboard', (req, res) => {
  const { totalVendas, novosClientes, totalPedidosHoje, totalPedidos30Dias, data } = req.body;

  const stmt = db.prepare(`
    INSERT INTO dashboard (totalVendas, novosClientes, totalPedidosHoje, totalPedidos30Dias, data)
    VALUES (?, ?, ?, ?, ?)
  `);
  stmt.run(totalVendas, novosClientes, totalPedidosHoje, totalPedidos30Dias, data, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ message: 'Registro criado com sucesso.' });
    }
  });
  stmt.finalize();
});

// Read - Obter todos os registros do dashboard
app.get('/dashboard', (req, res) => {
  db.all('SELECT * FROM dashboard', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(rows);
    }
  });
});

// Read - Obter um registro do dashboard por ID
app.get('/dashboard/:id', (req, res) => {
  const { id } = req.params;

  db.get('SELECT * FROM dashboard WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (row) {
      res.status(200).json(row);
    } else {
      res.status(404).json({ message: 'Registro não encontrado.' });
    }
  });
});

// Update - Atualizar um registro do dashboard por ID
app.put('/dashboard/:id', (req, res) => {
  const { id } = req.params;
  const { totalVendas, novosClientes, totalPedidosHoje, totalPedidos30Dias, data } = req.body;

  const stmt = db.prepare(`
    UPDATE dashboard
    SET totalVendas = ?, novosClientes = ?, totalPedidosHoje = ?, totalPedidos30Dias = ?, data = ?
    WHERE id = ?
  `);
  stmt.run(totalVendas, novosClientes, totalPedidosHoje, totalPedidos30Dias, data, id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'Registro atualizado com sucesso.' });
    }
  });
  stmt.finalize();
});

// Delete - Deletar um registro do dashboard por ID
app.delete('/dashboard/:id', (req, res) => {
  const { id } = req.params;

  const stmt = db.prepare('DELETE FROM dashboard WHERE id = ?');
  stmt.run(id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'Registro deletado com sucesso.' });
    }
  });
  stmt.finalize();
});

// Rotas para Usuários

// Create - Adicionar um novo usuário
app.post('/usuarios', (req, res) => {
  const { nome, email, senha } = req.body;

  const stmt = db.prepare(`
    INSERT INTO usuarios (nome, email, senha)
    VALUES (?, ?, ?)
  `);
  stmt.run(nome, email, senha, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ message: 'Usuário criado com sucesso.' });
    }
  });
  stmt.finalize();
});

// Read - Obter todos os usuários
app.get('/usuarios', (req, res) => {
  db.all('SELECT * FROM usuarios', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(rows);
    }
  });
});

// Read - Obter um usuário por ID
app.get('/usuarios/:id', (req, res) => {
  const { id } = req.params;

  db.get('SELECT * FROM usuarios WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (row) {
      res.status(200).json(row);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado.' });
    }
  });
});

// Update - Atualizar um usuário por ID
app.put('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;

  const stmt = db.prepare(`
    UPDATE usuarios
    SET nome = ?, email = ?, senha = ?
    WHERE id = ?
  `);
  stmt.run(nome, email, senha, id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'Usuário atualizado com sucesso.' });
    }
  });
  stmt.finalize();
});

// Delete - Deletar um usuário por ID
app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;

  const stmt = db.prepare('DELETE FROM usuarios WHERE id = ?');
  stmt.run(id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'Usuário deletado com sucesso.' });
    }
  });
  stmt.finalize();
});

// Rotas para Produtos

// Create - Adicionar um novo produto
app.post('/produtos', (req, res) => {
  const { nome, descricao, preco, quantidadeEstoque } = req.body;
  const dataCriacao = new Date().toISOString();

  const stmt = db.prepare(`
    INSERT INTO produtos (nome, descricao, preco, quantidadeEstoque, dataCriacao)
    VALUES (?, ?, ?, ?, ?)
  `);
  stmt.run(nome, descricao, preco, quantidadeEstoque, dataCriacao, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ message: 'Produto criado com sucesso.' });
    }
  });
  stmt.finalize();
});

// Read - Obter todos os produtos
app.get('/produtos', (req, res) => {
  db.all('SELECT * FROM produtos', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(rows);
    }
  });
});

// Read - Obter um produto por ID
app.get('/produtos/:id', (req, res) => {
  const { id } = req.params;

  db.get('SELECT * FROM produtos WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (row) {
      res.status(200).json(row);
    } else {
      res.status(404).json({ message: 'Produto não encontrado.' });
    }
  });
});

// Update - Atualizar um produto por ID
app.put('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco, quantidadeEstoque } = req.body;

  const stmt = db.prepare(`
    UPDATE produtos
    SET nome = ?, descricao = ?, preco = ?, quantidadeEstoque = ?
    WHERE id = ?
  `);
  stmt.run(nome, descricao, preco, quantidadeEstoque, id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'Produto atualizado com sucesso.' });
    }
  });
  stmt.finalize();
});

// Delete - Deletar um produto por ID
app.delete('/produtos/:id', (req, res) => {
  const { id } = req.params;

  const stmt = db.prepare('DELETE FROM produtos WHERE id = ?');
  stmt.run(id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'Produto deletado com sucesso.' });
    }
  });
  stmt.finalize();
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
