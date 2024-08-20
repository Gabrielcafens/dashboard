const mongoose = require('mongoose');

const DashboardSchema = new mongoose.Schema({
  totalVendas: { type: Number, required: true },
  novosClientes: { type: Number, required: true },
  totalPedidosHoje: { type: Number, required: true },
  totalPedidos30Dias: { type: Number, required: true },
  data: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Dashboard', DashboardSchema);
