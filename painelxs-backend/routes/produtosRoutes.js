const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');

// Rotas Produtos
router.post('/', produtosController.createProduct);
router.get('/', produtosController.getAllProducts);
router.get('/:id', produtosController.getProductById);
router.put('/:id', produtosController.updateProduct);
router.delete('/:id', produtosController.deleteProduct);

module.exports = router;
