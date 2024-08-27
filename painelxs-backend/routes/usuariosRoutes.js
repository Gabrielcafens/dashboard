const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const authenticateToken = require('../middleware/authenticateToken');

// Rotas Usuários
router.post('/', usuariosController.createUser); // Criar usuário
router.get('/', authenticateToken, usuariosController.getAllUsers); // Listar todos os usuários
router.get('/:id', authenticateToken, usuariosController.getUserById); // Obter usuário por ID
router.put('/:id', authenticateToken, usuariosController.updateUser); // Atualizar usuário
router.delete('/:id', authenticateToken, usuariosController.deleteUser); // Deletar usuário

// Outras rotas de usuários
router.post('/login', usuariosController.loginUser);
router.post('/forgot-password', usuariosController.forgotPassword);
router.post('/reset-password', usuariosController.resetPassword);

module.exports = router;
