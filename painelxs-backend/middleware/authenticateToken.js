const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401); // Sem token, acesso negado

  jwt.verify(token, process.env.JWT_SECRET || 'secreta-chave', (err, user) => {
    if (err) return res.sendStatus(403); // Token inválido ou expirado
    req.user = user; // Adiciona o usuário ao request
    next(); // Continua para a próxima função
  });
};


module.exports = authenticateToken;
