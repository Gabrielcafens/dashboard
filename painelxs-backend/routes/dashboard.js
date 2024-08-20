const express = require('express');
const Dashboard = require('../models/Dashboard');

const router = express.Router();

// Criar novo registro
router.post('/', async (req, res) => {
  try {
    const novoDashboard = new Dashboard(req.body);
    const salvoDashboard = await novoDashboard.save();
    res.status(201).json(salvoDashboard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Ler todos os registros
router.get('/', async (req, res) => {
  try {
    const dashboards = await Dashboard.find();
    res.json(dashboards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ler um registro específico por ID
router.get('/:id', async (req, res) => {
  try {
    const dashboard = await Dashboard.findById(req.params.id);
    if (!dashboard) return res.status(404).json({ message: 'Registro não encontrado' });
    res.json(dashboard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Atualizar um registro por ID
router.put('/:id', async (req, res) => {
  try {
    const updatedDashboard = await Dashboard.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDashboard) return res.status(404).json({ message: 'Registro não encontrado' });
    res.json(updatedDashboard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deletar um registro por ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedDashboard = await Dashboard.findByIdAndDelete(req.params.id);
    if (!deletedDashboard) return res.status(404).json({ message: 'Registro não encontrado' });
    res.json({ message: 'Registro deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
