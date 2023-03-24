const models = require('../models');

const getServicos = async (id) => {
    // const corpo = { email, password };
    // findOne método que obtem a primeira entrada que encontra
    const resultServicos = await models.servicos.findAll({ where: { barbeiro_id: id } }); 
    // return login;
    // const result = `Email: ${email} Senha: ${password}`;
    // consolo.log(corpo);
    // console.log(`result ${result}`);
    return resultServicos;
};

// const cadClientes = async (dados) => {

//     const resultCriaUsua = await models.clientes.create(dados)
//     return resultCriaUsua;
//     // return { service: {...dados} };
// }

module.exports = { getServicos };