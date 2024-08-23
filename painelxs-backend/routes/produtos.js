const express = require('express');
const db = require('../models/Products'); // Atualize o caminho conforme necessário

const router = express.Router();

// Criar novo produto
router.post('/', (req, res) => {
  const { nome, descricao, preco, quantidadeEstoque } = req.body;
  const dataCriacao = new Date().toISOString();

  db.run(
    `INSERT INTO produtos (nome, descricao, preco, quantidadeEstoque, dataCriacao)
     VALUES (?, ?, ?, ?, ?)`,
    [nome, descricao, preco, quantidadeEstoque, dataCriacao],
    function (err) {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      res.status(201).json({ id: this.lastID, ...req.body, dataCriacao });
    }
  );
});

// Ler todos os produtos
router.get('/', (req, res) => {
  db.all(`SELECT * FROM produtos`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json(rows);
  });
});

// Ler um produto específico por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get(`SELECT * FROM produtos WHERE id = ?`, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.json(row);
  });
});

// Atualizar um produto por ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco, quantidadeEstoque } = req.body;

  db.run(
    `UPDATE produtos SET nome = ?, descricao = ?, preco = ?, quantidadeEstoque = ? WHERE id = ?`,
    [nome, descricao, preco, quantidadeEstoque, id],
    function (err) {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }
      res.json({ id, ...req.body });
    }
  );
});

// Deletar um produto por ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM produtos WHERE id = ?`, [id], function (err) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.json({ message: 'Produto deletado com sucesso' });
  });
});

module.exports = router;
