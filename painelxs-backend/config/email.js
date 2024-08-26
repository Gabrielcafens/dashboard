const nodemailer = require('nodemailer');

// Crie o transportador com as configurações do Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
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
