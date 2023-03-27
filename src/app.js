const express = require('express');
const rotaCadastraCliente = require('./routes/clientes.routers');
const rotaLogin = require('./routes/login.router');
const rotaBarbeiros = require('./routes/barbeiros.router');
const rotaServicos = require('./routes/servicos.router');
const rotaAgendamentos = require('./routes/agendamentos.router');
const cors = require('cors');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use(cors());

app.use('/cadastro-clientes', rotaCadastraCliente);
app.use('/login', rotaLogin);
app.use('/barbeiros', rotaBarbeiros);
app.use('/servicos', rotaServicos);
app.use('/horarios', rotaAgendamentos);
app.use('/confirma/agendamento', rotaAgendamentos);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
