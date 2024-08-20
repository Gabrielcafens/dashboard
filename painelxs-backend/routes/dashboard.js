const express = require('express');
const db = require('../models/Dashboard');

const router = express.Router();

// Criar novo registro
router.post('/', (req, res) => {
  const { totalVendas, novosClientes, totalPedidosHoje, totalPedidos30Dias } = req.body;
  const data = new Date().toISOString();

  db.run(
    `INSERT INTO dashboard (totalVendas, novosClientes, totalPedidosHoje, totalPedidos30Dias, data)
     VALUES (?, ?, ?, ?, ?)`,
    [totalVendas, novosClientes, totalPedidosHoje, totalPedidos30Dias, data],
    function (err) {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      res.status(201).json({ id: this.lastID, ...req.body, data });
    }
  );
});

// Ler todos os registros
router.get('/', (req, res) => {
  db.all(`SELECT * FROM dashboard`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json(rows);
  });
});

// Ler um registro específico por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get(`SELECT * FROM dashboard WHERE id = ?`, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: 'Registro não encontrado' });
    }
    res.json(row);
  });
});

// Atualizar um registro por ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { totalVendas, novosClientes, totalPedidosHoje, totalPedidos30Dias } = req.body;

  db.run(
    `UPDATE dashboard SET totalVendas = ?, novosClientes = ?, totalPedidosHoje = ?, totalPedidos30Dias = ? WHERE id = ?`,
    [totalVendas, novosClientes, totalPedidosHoje, totalPedidos30Dias, id],
    function (err) {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Registro não encontrado' });
      }
      res.json({ id, ...req.body });
    }
  );
});

// Deletar um registro por ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM dashboard WHERE id = ?`, [id], function (err) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Registro não encontrado' });
    }
    res.json({ message: 'Registro deletado com sucesso' });
  });
});

module.exports = router;
