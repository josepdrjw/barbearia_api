const nodemailer = require('nodemailer'); // npm install nodemailer

function sendEmail(from, to, subject, text) {
  // configurando o transporte SMTP
  const transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 25,
    secure: false,
  });

  // definindo as opções de mensagem
  const mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: text,
  };

  // enviando o e-mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('E-mail enviado: ' + info.response);
    }
  });
}

// usando a função para enviar um e-mail
sendEmail('seu-email@exemplo.com', 'destinatario@exemplo.com', 'Assunto do e-mail', 'Conteúdo do e-mail');
