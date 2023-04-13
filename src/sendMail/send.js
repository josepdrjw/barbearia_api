const nodemailer = require('nodemailer');

const enviarEmail = async (destinatario) => {
  // Criando o objeto de transporte SMTP reutilizável usando as configurações do Outlook
  let transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
      user: 'gilmarciapinheiropereira@outlook.com',
      pass: 'Jw190390!',
    },
  });

  // Definindo as opções de email
  let mailOptions = {
    from: '"Barbearia Borges" <gilmarciapinheiropereira@outlook.com>',
    to: destinatario,
    subject: 'Redefinição de senha',
    text: 'Este é um email automatico de redefinição de senha',
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
