const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const authenticateToken = require('../middleware/authenticateToken'); // Importa o middleware

// Rotas Usuários
router.post('/', usuariosController.createUser);        // Criar um novo usuário
router.get('/', usuariosController.getAllUsers);        // Ler todos os usuários
router.get('/:id', authenticateToken, usuariosController.getUserById);     // Ler um usuário específico por ID (protegido)
router.put('/:id', authenticateToken, usuariosController.updateUser);      // Atualizar um usuário por ID (protegido)
router.delete('/:id', authenticateToken, usuariosController.deleteUser);   // Deletar um usuário por ID (protegido)
router.post('/login', usuariosController.loginUser);    // Login de usuário

module.exports = router;
