const nodemailer = require('nodemailer');

// criar um objeto de transporte SMTP reutilizável usando as configurações padrão do Gmail
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'josepdrjw@gmail.com',
        pass: 'Jw190390!'
    }
});

// definir as opções de email
let mailOptions = {
    from: 'josepdrjw@gmail.com',
    to: 'gilmarciapinheiropereira@exemplo.com',
    subject: 'Barbearia',
    html: '<h1>Teste de envio de correspondencia</h1>'
};

// enviar o email
transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email enviado: ' + info.response);
    }
});
