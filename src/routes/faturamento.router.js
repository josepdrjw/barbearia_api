const Router = require('express').Router;
const {
  postFaturamento,
  getInvoiceDay,
  faturaMesBarberId,
  faturaMensalGeral,
  faturamentoPeriodo,
  updateRegisFatur
} = require('../controllers/faturamento.controller');
const verifyToken = require('../middlewares/validtoken');


const rota = Router();

rota.post('/', verifyToken, postFaturamento);
rota.get('/:id/:data', verifyToken, getInvoiceDay);
rota.get('/mensal', verifyToken, faturaMesBarberId);
rota.get('/geral', verifyToken, faturaMensalGeral);
rota.get('/:id/:de/:ate', verifyToken, faturamentoPeriodo);
rota.put('/update', verifyToken, updateRegisFatur);

module.exports = rota;