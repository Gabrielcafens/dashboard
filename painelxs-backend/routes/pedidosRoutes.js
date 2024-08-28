const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');

// Rotas Pedidos
router.post('/', pedidosController.createPedido);
router.get('/', pedidosController.getAllPedidos);
router.get('/:id', pedidosController.getPedidoById);
router.put('/:id', pedidosController.updatePedido);
router.delete('/:id', pedidosController.deletePedido);

module.exports = router;
