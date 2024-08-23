const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// Rotas Usuários
router.post('/', usuariosController.createUser);        // Criar um novo usuário
router.get('/', usuariosController.getAllUsers);        // Ler todos os usuários
router.get('/:id', usuariosController.getUserById);     // Ler um usuário específico por ID
router.put('/:id', usuariosController.updateUser);      // Atualizar um usuário por ID
router.delete('/:id', usuariosController.deleteUser);   // Deletar um usuário por ID
router.post('/login', usuariosController.loginUser);    // Login de usuário

module.exports = router;
