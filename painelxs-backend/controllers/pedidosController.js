const db = require('../models/Pedidos'); // Certifique-se de que o caminho está correto

// Create
exports.createPedido = (req, res) => {
  const { produtoId, quantidade, usuarioId } = req.body;

  if (!produtoId || !quantidade || !usuarioId) {
    return res.status(400).json({ error: 'Todos os campos (produtoId, quantidade, usuarioId) são necessários.' });
  }

  const dataCriacao = new Date().toISOString();

  const stmt = db.prepare(`
    INSERT INTO pedidos (produtoId, quantidade, usuarioId, dataCriacao)
    VALUES (?, ?, ?, ?)
  `);

  stmt.run(produtoId, quantidade, usuarioId, dataCriacao, function(err) {
    if (err) {
      console.error("Erro ao criar pedido:", err.message);
      res.status(500).json({ error: err.message });
    } else {
      console.log("Pedido criado com sucesso, ID:", this.lastID);
      res.status(201).json({ message: 'Pedido criado com sucesso.', id: this.lastID });
    }
  });

  stmt.finalize();
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
  const { produtoId, quantidade, usuarioId } = req.body;

  if (!produtoId || !quantidade || !usuarioId) {
    return res.status(400).json({ error: 'Todos os campos (produtoId, quantidade, usuarioId) são necessários.' });
  }

  const stmt = db.prepare(`
    UPDATE pedidos
    SET produtoId = ?, quantidade = ?, usuarioId = ?
    WHERE id = ?
  `);

  stmt.run(produtoId, quantidade, usuarioId, id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'Pedido atualizado com sucesso.' });
    }
  });

  stmt.finalize();
};

// Delete
exports.deletePedido = (req, res) => {
  const { id } = req.params;

  const stmt = db.prepare('DELETE FROM pedidos WHERE id = ?');
  stmt.run(id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'Pedido deletado com sucesso.' });
    }
  });

  stmt.finalize();
};
