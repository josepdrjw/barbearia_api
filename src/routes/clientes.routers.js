const Router = require('express').Router;
const controller = require('../controllers/clientes.controller');
const { validCampoName, validCamposEmailPass } = require('../middlewares/clientesCampos');


const rota = Router();

rota.post('/', validCampoName, validCamposEmailPass, controller.cadClientes);
rota.get('/', controller.todoCleintes);

module.exports = rota;
