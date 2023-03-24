const Router = require('express').Router;
const controller = require('../controllers/barbeiros.controller');
const verifyToken = require('../middlewares/validtoken');


const rota = Router();

rota.get('/', verifyToken, controller.getBarbers);

module.exports = rota;