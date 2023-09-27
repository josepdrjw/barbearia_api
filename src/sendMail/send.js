const nodemailer = require('nodemailer');

const enviarEmail = async (destinatario, name, token) => {
  // Criando o objeto de transporte SMTP reutilizável usando as configurações do Outlook
  let transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
      user: 'barbearia-borges@outlook.com',
      pass: 'Jw190390!',
    },
  });

  // Definindo as opções de email
  let mailOptions = {
    from: '"Barbearia Borges" <barbearia-borges@outlook.com>',
    to: destinatario,
    subject: 'Redefinição de senha',
    text: `Olá ${name} este é o link de redefinição de senha Token: https://barbeariaborges.com/newpassword/${token}`,
  };

  try {
    // Enviando o email
    let info = await transporter.sendMail(mailOptions);
    return `Email enviado para: ${destinatario}`
  } catch (error) {
    return `Erro ao enviar o email: ${error}`
  }
};

// Exemplo de uso:
// enviarEmail('exemplo@gmail.com');

module.exports = enviarEmail;
