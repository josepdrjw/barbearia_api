const express = require('express');
const rotaCadastraCliente = require('./routes/clientes.routers');
const rotaLogin = require('./routes/login.router');
const rotaLoginBarber = require('./routes/loginBarber.router');
const rotaBarbeiros = require('./routes/barbeiros.router');
const rotaServicos = require('./routes/servicos.router');
const rotaAgendamentos = require('./routes/agendamentos.router');
const rotaAgendados = require('./routes/agendados.router');
const rotaRedefiniPasswordCliente = require('./routes/redefinir.router');
const rotaRedefiniPasswordBarber = require('./routes/redefinirPassBarber.router');
const rotaUpload = require('./routes/upload.router');

const rotaFaturamento = require('./routes/faturamento.router');
const cors = require('cors');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use(cors());
// rotas de usuarios `Clientes`
app.use('/cadastro-clientes', rotaCadastraCliente);
app.use('/redefinir-senha', rotaRedefiniPasswordCliente);
app.use('/upload', rotaUpload);
app.use('/login', rotaLogin);
app.use('/barbeiros', rotaBarbeiros);
app.use('/servicos', rotaServicos);
app.use('/horarios', rotaAgendamentos);
app.use('/confirma/agendamento', rotaAgendamentos);
app.use('/uploads', express.static('src/uploads'));

//rotas de administrador e barbeiros
app.use('/login-barber', rotaLoginBarber);
app.use('/redefinir-senha-barber', rotaRedefiniPasswordBarber)
app.use('/agendados', rotaAgendados);
app.use('/faturamento', rotaFaturamento);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
