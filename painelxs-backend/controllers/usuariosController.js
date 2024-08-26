const db = require('../models/Usuarios'); // Atualize o caminho conforme necessário
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Para autenticação de token

// Criar um novo usuário
exports.createUser = (req, res) => {
  const { nome, email, senha } = req.body;
  const dataCriacao = new Date().toISOString();

  bcrypt.hash(senha, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    db.run(
      `INSERT INTO usuarios (nome, email, senha, dataCriacao) VALUES (?, ?, ?, ?)`,
      [nome, email, hash, dataCriacao],
      function (err) {
        if (err) {
          return res.status(400).json({ message: err.message });
        }
        res.status(201).json({ id: this.lastID, nome, email, dataCriacao });
      }
    );
  });
};

// Ler todos os usuários
exports.getAllUsers = (req, res) => {
  db.all(`SELECT * FROM usuarios`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json(rows);
  });
};

// Ler um usuário específico por ID
exports.getUserById = (req, res) => {
  const { id } = req.params;
  db.get(`SELECT * FROM usuarios WHERE id = ?`, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.json(row);
  });
};

// Atualizar um usuário por ID
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;

  const updateFields = [];
  const values = [];

  if (nome) {
    updateFields.push('nome = ?');
    values.push(nome);
  }
  if (email) {
    updateFields.push('email = ?');
    values.push(email);
  }
  if (senha) {
    // Hash da nova senha
    bcrypt.hash(senha, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      updateFields.push('senha = ?');
      values.push(hash);
      
      db.run(
        `UPDATE usuarios SET ${updateFields.join(', ')} WHERE id = ?`,
        [...values, id],
        function (err) {
          if (err) {
            return res.status(400).json({ message: err.message });
          }
          if (this.changes === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
          }
          res.json({ id, ...req.body });
        }
      );
    });
    return; // Evita que a execução continue após o hash
  }

  db.run(
    `UPDATE usuarios SET ${updateFields.join(', ')} WHERE id = ?`,
    [...values, id],
    function (err) {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      res.json({ id, ...req.body });
    }
  );
};

// Deletar um usuário por ID
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM usuarios WHERE id = ?`, [id], function (err) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.json({ message: 'Usuário deletado com sucesso' });
  });
};

// Login de usuário

exports.loginUser = (req, res) => {
  const { email, senha } = req.body;

  db.get('SELECT * FROM usuarios WHERE email = ?', [email], (err, user) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    bcrypt.compare(senha, user.senha, (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      if (!result) {
        return res.status(401).json({ message: 'Senha incorreta' });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'secreta-chave', { expiresIn: '1h' });

      res.json({ message: 'Login bem-sucedido', token });
    });
  });
};

exports.resetPassword = (req, res) => {
  const { token, novaSenha } = req.body;

  db.get('SELECT * FROM usuarios WHERE resetToken = ? AND resetTokenExpires > ?', [token, Date.now()], (err, user) => {
    if (err || !user) {
      return res.status(400).json({ message: 'Token inválido ou expirado' });
    }

    bcrypt.hash(novaSenha, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao hashear a senha' });
      }

      db.run('UPDATE usuarios SET senha = ?, resetToken = NULL, resetTokenExpires = NULL WHERE email = ?', [hash, user.email], (err) => {
        if (err) {
          return res.status(500).json({ message: 'Erro ao atualizar a senha' });
        }

        res.json({ message: 'Senha redefinida com sucesso' });
      });
    });
  });
};
