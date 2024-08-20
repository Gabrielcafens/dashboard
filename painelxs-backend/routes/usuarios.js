const express = require('express');
const router = express.Router();
const db = require('../models/Dashboard'); // Certifique-se de que o caminho está correto

// Criar um novo usuário
router.post('/', (req, res) => {
  const { nome, email, senha } = req.body;
  const dataCriacao = new Date().toISOString();

  db.run(
    `INSERT INTO usuarios (nome, email, senha, dataCriacao) VALUES (?, ?, ?, ?)`,
    [nome, email, senha, dataCriacao],
    function (err) {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      res.status(201).json({ id: this.lastID, nome, email, dataCriacao });
    }
  );
});

module.exports = router;
