const db = require('../models/Produtos'); // Importa a conexão com o banco de dados

// Create
exports.createProduct = (req, res) => {
  const { nome, descricao, preco, quantidadeEstoque } = req.body;
  const dataCriacao = new Date().toISOString();

  const stmt = db.prepare(`
    INSERT INTO produtos (nome, descricao, preco, quantidadeEstoque, dataCriacao)
    VALUES (?, ?, ?, ?, ?)
  `);

  stmt.run(nome, descricao, preco, quantidadeEstoque, dataCriacao, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ message: 'Produto criado com sucesso.', id: this.lastID });
    }
  });

  stmt.finalize();
};

// Read - Todos
exports.getAllProducts = (req, res) => {
  db.all('SELECT * FROM produtos', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(rows);
    }
  });
};

// Read - Por ID
exports.getProductById = (req, res) => {
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
};

// Update
exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco, quantidadeEstoque } = req.body;

  const updateFields = [];
  const values = [];

  if (nome !== undefined) {
    updateFields.push('nome = ?');
    values.push(nome);
  }
  if (descricao !== undefined) {
    updateFields.push('descricao = ?');
    values.push(descricao);
  }
  if (preco !== undefined) {
    updateFields.push('preco = ?');
    values.push(preco);
  }
  if (quantidadeEstoque !== undefined) {
    updateFields.push('quantidadeEstoque = ?');
    values.push(quantidadeEstoque);
  }

  if (updateFields.length === 0) {
    return res.status(400).json({ error: 'Nenhum campo para atualizar.' });
  }

  const stmt = db.prepare(`UPDATE produtos SET ${updateFields.join(', ')} WHERE id = ?`);

  stmt.run(...values, id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'Produto atualizado com sucesso.' });
    }
  });

  stmt.finalize();
};

// Delete
exports.deleteProduct = (req, res) => {
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
};
