const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// Rota para criar um novo usuário
router.post('/create', usuariosController.createUser);

// Rota para login
router.post('/login', usuariosController.loginUser);

// Rota para redefinir a senha
router.post('/reset-password', usuariosController.resetPassword);

// Rota para enviar e-mail de redefinição de senha
router.post('/forgot-password', usuariosController.forgotPassword);

// Rota para obter todos os usuários
router.get('/', usuariosController.getAllUsers);

// Rota para obter um usuário específico por ID
router.get('/:id', usuariosController.getUserById);

// Rota para atualizar um usuário por ID
router.put('/:id', usuariosController.updateUser);

// Rota para deletar um usuário por ID
router.delete('/:id', usuariosController.deleteUser);

module.exports = router;
