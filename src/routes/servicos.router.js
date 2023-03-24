const Router = require('express').Router;
const controller = require('../controllers/servicos.controller');
const verifyToken = require('../middlewares/validtoken');


const rota = Router();

rota.get('/:id', verifyToken, controller.getServicos);

module.exports = rota;