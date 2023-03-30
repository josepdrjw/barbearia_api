const nodemailer = require("nodemailer");

// Criando o objeto de transporte SMTP reutilizável usando as configurações do AOL
let transporter = nodemailer.createTransport({
  host: "smtp.aol.com",
  port: 587,
  secure: false,
  auth: {
    user: "zaine.r@aol.com",
    pass: "Jw91259870!",
  },
//   tls: {
//     ciphers: "SSLv3",
//   },
});

// Definindo as opções de email
let mailOptions = {
  from: "Barbearia Borges",
  to: "josepdrjw@gmail.com",
  subject: "Serviço de correio",
  text: "Olá este é um email teste ",
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
