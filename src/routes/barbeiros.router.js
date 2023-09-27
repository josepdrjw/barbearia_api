const Router = require('express').Router;
const { getBarbers, login, cadastroNewUser } = require('../controllers/barbeiros.controller');
const verifyToken = require('../middlewares/validtoken');
const { validCamposEmailPassLogin, validCampoName, validCamposEmailPass } = require('../middlewares/clientesCampos');
// const { validCampoName, validCamposEmailPass } = require('../middlewares/clientesCampos');


const rota = Router();

rota.get('/', verifyToken, getBarbers);
rota.post('/', validCamposEmailPassLogin, login);
rota.post('/new',verifyToken, validCampoName, validCamposEmailPass, cadastroNewUser);

module.exports = rota;