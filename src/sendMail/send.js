const nodemailer = require("nodemailer");

// Criando o objeto de transporte SMTP reutilizável usando as configurações do Outlook
let transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: "gilmarciapinheiropereira@outlook.com",
    pass: "Jw190390!",
  },
});

// Definindo as opções de email
let mailOptions = {
  from: "Barbearia Borges",
  to: "gilmarciapinheiropereira@outlook.com",
  subject: "Borges",
  text: "Olá",
};

// Enviando o email
transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email enviado: " + info.response);
    console.log(`Enviado para : ${mailOptions.to}`);
  }
});
