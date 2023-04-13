const Router = require('express').Router;
const verficaEmailEnviaLink = require('../controllers/redefinirSenha.controller');
const validEmail = require('../middlewares/validaEmail');


const rota = Router();

rota.post('/', validEmail, verficaEmailEnviaLink);

module.exports = rota;


// 1- O usuário informa o email no formulário de esqueci minha senha e envia a requisição para o backend.
// 2- O backend verifica se o email existe na base de dados e, se sim, gera um token de redefinição de senha para esse usuário.
// 3- O token é armazenado na base de dados e um link para a página de redefinição de senha contendo o token é enviado para o email do usuário.
// 4- O usuário acessa o link e é direcionado para a página de redefinição de senha.
// 5- O usuário informa a nova senha e envia a requisição para o backend.
// 6- O backend verifica se o token de redefinição de senha é válido e se o email do usuário está associado a esse token.
// 7- Se as verificações passarem, a senha do usuário é atualizada na base de dados e o token é removido.