const db = require('../models/Dashboard'); // Importar a conexão com o banco de dados

// Create
exports.createDashboardRecord = (req, res) => {
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
};

// Read - Todos
exports.getAllDashboardRecords = (req, res) => {
  db.all('SELECT * FROM dashboard', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(rows);
    }
  });
};

// Read - Por ID
exports.getDashboardRecordById = (req, res) => {
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
};

// Update
exports.updateDashboardRecord = (req, res) => {
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
};

// Delete
exports.deleteDashboardRecord = (req, res) => {
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
};
