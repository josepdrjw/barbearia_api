const Router = require('express').Router;
const controller = require('../controllers/agendamentos.controller');
const verifyToken = require('../middlewares/validtoken');
const { payloadAgendamento } = require('../middlewares/camposAgendamento');
const { payloadAgendamentoBarbeiro } = require('../middlewares/camposAgendamentoBarber');


const rota = Router();

rota.get('/:data/:id', verifyToken, controller.getHorarios);
rota.get('/:id',verifyToken, controller.getAgendId);
rota.put('/', verifyToken, controller.cancelaAgendamento);
rota.put('/barber', verifyToken, controller.cancelaAgendamentoBarber);
rota.post('/', verifyToken, controller.postAgendamento);
rota.post('/barbeiro', verifyToken, payloadAgendamentoBarbeiro, controller.postBarberAgendamento);

module.exports = rota;
