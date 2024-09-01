const db = require('../models/Pedidos'); // Certifique-se de que o caminho está correto

// Create
exports.createPedido = (req, res) => {
  const { produto_id, quantidade, usuario_id } = req.body;

  if (!produto_id || !quantidade || !usuario_id) {
    return res.status(400).json({ error: 'Todos os campos (produto_id, quantidade, usuario_id) são necessários.' });
  }

  const sql = `
    INSERT INTO pedidos (produto_id, quantidade, usuario_id)
    VALUES (?, ?, ?)
  `;

  db.run(sql, [produto_id, quantidade, usuario_id], function(err) {
    if (err) {
      console.error("Erro ao criar pedido:", err.message);
      res.status(500).json({ error: err.message });
    } else {
      console.log("Pedido criado com sucesso, ID:", this.lastID);
      res.status(201).json({ message: 'Pedido criado com sucesso.', id: this.lastID });
    }
  });
};

// Read - Todos
exports.getAllPedidos = (req, res) => {
  db.all('SELECT * FROM pedidos', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(rows);
    }
  });
};

// Read - Por ID
exports.getPedidoById = (req, res) => {
  const { id } = req.params;

  db.get('SELECT * FROM pedidos WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (row) {
      res.status(200).json(row);
    } else {
      res.status(404).json({ message: 'Pedido não encontrado.' });
    }
  });
};

// Update
exports.updatePedido = (req, res) => {
  const { id } = req.params;
  const { produto_id, quantidade, usuario_id } = req.body;

  if (!produto_id || !quantidade || !usuario_id) {
    return res.status(400).json({ error: 'Todos os campos (produto_id, quantidade, usuario_id) são necessários.' });
  }

  const sql = `
    UPDATE pedidos
    SET produto_id = ?, quantidade = ?, usuario_id = ?
    WHERE id = ?
  `;

  db.run(sql, [produto_id, quantidade, usuario_id, id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'Pedido atualizado com sucesso.' });
    }
  });
};

// Delete
exports.deletePedido = (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM pedidos WHERE id = ?';
  db.run(sql, [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'Pedido deletado com sucesso.' });
    }
  });
};
