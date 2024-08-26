const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const testEmail = () => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'test@example.com',
    subject: 'Teste de Envio',
    text: 'Este é um teste de envio de e-mail.'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Erro ao enviar o e-mail:', error);
    } else {
      console.log('E-mail enviado:', info.response);
    }
  });
};

testEmail();
