const Router = require('express').Router;
const controller = require('../controllers/clientes.controller');
const { validCamposEmailPassLogin } = require('../middlewares/clientesCampos');


const rota = Router();

rota.post('/', validCamposEmailPassLogin, controller.login);

module.exports = rota;