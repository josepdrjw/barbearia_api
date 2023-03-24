const models = require('../models');

const getEmail = async (email) => {
    // const corpo = { email, password };
    // findOne método que obtem a primeira entrada que encontra
    const resultEmail = await models.clientes.findOne({ where: { email } }); 
    // return login;
    // const result = `Email: ${email} Senha: ${password}`;
    // consolo.log(corpo);
    // console.log(`result ${result}`);
    return resultEmail;
};

const cadClientes = async (dados) => {

    const resultCriaUsua = await models.clientes.create(dados)
    return resultCriaUsua;
    // return { service: {...dados} };
}

module.exports = { cadClientes, getEmail };