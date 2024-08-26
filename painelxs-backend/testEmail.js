const nodemailer = require('nodemailer');
require('dotenv').config(); // Carregar variáveis de ambiente do .env

// Configuração do transporter com Mailtrap
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  }
});

// Função para testar o envio de e-mail
const testEmail = () => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Pode ser qualquer e-mail fictício para fins de teste
    to: 'test@example.com', // Substitua pelo e-mail de teste desejado
    subject: 'Teste de Envio',
    text: 'Este é um teste de envio de e-mail com Mailtrap.'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Erro ao enviar o e-mail:', error);
    } else {
      console.log('E-mail enviado:', info.response);
    }
  });
};

// Executar o teste de e-mail
testEmail();
