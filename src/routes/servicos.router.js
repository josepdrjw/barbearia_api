const Router = require('express').Router;
const { getAllServicos, cadastroServico, update } = require('../controllers/servicos.controller');
const verifyToken = require('../middlewares/validtoken');


const rota = Router();

rota.get('/:id', verifyToken, getAllServicos);
rota.put('/', verifyToken, update);
rota.post('/', verifyToken, cadastroServico);

module.exports = rota;