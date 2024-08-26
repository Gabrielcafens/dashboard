const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');

// Função para verificar se a senha está em hash
const isHashedPassword = (password) => {
  return password.startsWith('$2b$') || password.startsWith('$2a$') || password.startsWith('$2y$');
};

// Função para atualizar todas as senhas não hashadas
const updateAllPasswords = async () => {
  db.all('SELECT id, senha FROM usuarios', [], async (err, rows) => {
    if (err) {
      console.error('Erro ao recuperar usuários:', err.message);
      return;
    }

    for (const user of rows) {
      if (!isHashedPassword(user.senha)) {
        try {
          const hashedPassword = await bcrypt.hash(user.senha, 10);

          db.run('UPDATE usuarios SET senha = ? WHERE id = ?', [hashedPassword, user.id], (err) => {
            if (err) {
              console.error(`Erro ao atualizar a senha do usuário ${user.id}:`, err.message);
            } else {
              console.log(`Senha do usuário ${user.id} atualizada com sucesso.`);
            }
          });
        } catch (err) {
          console.error(`Erro ao hashear a senha do usuário ${user.id}:`, err);
        }
      }
    }

    // Fechar a conexão após a atualização
    db.close();
  });
};

// Executar a atualização
updateAllPasswords();
