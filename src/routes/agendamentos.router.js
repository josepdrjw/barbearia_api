const Router = require('express').Router;
const controller = require('../controllers/agendamentos.controller');
const verifyToken = require('../middlewares/validtoken');


const rota = Router();

rota.get('/:data/:id', verifyToken, controller.getHorarios);
rota.post('/', verifyToken, controller.postAgendamento);

module.exports = rota;