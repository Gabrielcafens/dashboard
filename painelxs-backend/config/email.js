const nodemailer = require('nodemailer');
require('dotenv').config(); // Carregar variáveis de ambiente

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  }
});

const sendResetEmail = (email, resetUrl) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Redefinição de Senha',
    text: `Você solicitou uma redefinição de senha. Clique no link a seguir para redefinir sua senha: ${resetUrl}`
  };

  return transporter.sendMail(mailOptions)
    .then(info => console.log('E-mail enviado:', info.response))
    .catch(error => {
      console.error('Erro ao enviar o e-mail:', error);
      throw error;
    });
};

module.exports = sendResetEmail;
