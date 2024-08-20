const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');

// Função para gerar um valor aleatório
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Função para gerar uma data aleatória
const getRandomDate = () => {
  const start = new Date(2023, 0, 1); // Data de início
  const end = new Date(); // Data final (hoje)
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
};

// Função para gerar um nome aleatório
const getRandomName = () => {
  const names = ['João', 'Maria', 'Pedro', 'Ana', 'Carlos', 'Fernanda', 'José', 'Juliana'];
  return names[Math.floor(Math.random() * names.length)];
};

// Função para gerar um email aleatório
const getRandomEmail = () => {
  const domains = ['example.com', 'test.com', 'demo.com'];
  const name = getRandomName().toLowerCase();
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${name}_${getRandomInt(1000, 9999)}@${domain}`; // Adiciona um número aleatório ao email
};

// Função para gerar uma senha aleatória
const getRandomPassword = () => {
  return Math.random().toString(36).slice(-8); // Senha de 8 caracteres aleatórios
};

// Função para verificar se o email já existe
const emailExists = (email, callback) => {
  db.get('SELECT 1 FROM usuarios WHERE email = ?', [email], (err, row) => {
    if (err) {
      console.error('Erro ao verificar email:', err.message);
      callback(err);
    } else {
      callback(null, !!row);
    }
  });
};

// Inserir dados aleatórios
const insertRandomUsers = (numRecords) => {
  const stmt = db.prepare(`
    INSERT INTO usuarios (nome, email, senha, dataCriacao)
    VALUES (?, ?, ?, ?)
  `);

  let count = 0;

  const insertNext = () => {
    if (count < numRecords) {
      const nome = getRandomName();
      let email = getRandomEmail();

      emailExists(email, (err, exists) => {
        if (err) {
          console.error('Erro ao verificar email:', err.message);
          return;
        }

        if (exists) {
          // Se o email já existe, gera um novo
          email = getRandomEmail();
          insertNext(); // Tenta inserir novamente
        } else {
          const senha = getRandomPassword();
          const dataCriacao = getRandomDate();

          stmt.run(nome, email, senha, dataCriacao, (err) => {
            if (err) {
              console.error('Erro ao inserir dados:', err.message);
            } else {
              console.log(`Usuário ${count + 1} inserido.`);
              count++;
              insertNext();
            }
          });
        }
      });
    } else {
      stmt.finalize(() => {
        console.log(`Dados aleatórios de usuários inseridos com sucesso.`);
        db.close();
      });
    }
  };

  insertNext();
};

// Inserir 10 registros aleatórios
insertRandomUsers(10);
