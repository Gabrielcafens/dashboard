const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const authenticateToken = require('../middleware/authenticateToken');

// Rotas Usuários
router.post('/', usuariosController.createUser);        
router.get('/', authenticateToken, usuariosController.getAllUsers);        
router.get('/:id', authenticateToken, usuariosController.getUserById);     
router.put('/:id', authenticateToken, usuariosController.updateUser);      
router.delete('/:id', authenticateToken, usuariosController.deleteUser);   

// Outras rotas de usuários
router.post('/login', usuariosController.loginUser);    
router.post('/forgot-password', usuariosController.forgotPassword);
router.post('/reset-password', usuariosController.resetPassword);

module.exports = router;
