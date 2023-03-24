const Router = require('express').Router;
const controller = require('../controllers/clientes.controller');
const { validCamposEmailPass } = require('../middlewares/clientesCampos');


const rota = Router();

rota.post('/', validCamposEmailPass, controller.login);

module.exports = rota;