const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3001;

// Middleware para parsear JSON
app.use(express.json());

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database('./data.db');

// Create - Adicionar um novo registro
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

// Read - Obter todos os registros
app.get('/dashboard', (req, res) => {
  db.all('SELECT * FROM dashboard', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(rows);
    }
  });
});

// Read - Obter um registro por ID
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

// Update - Atualizar um registro por ID
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

// Delete - Deletar um registro por ID
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

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
