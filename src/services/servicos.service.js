const { login } = require('../controllers/barbeiros.controller');
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

const cadServico = async (dados) => {

    try {
        const resultCriaUsua = await models.servicos.create(dados)
        return 'Serviço cadastrado com sucesso!';
    } catch (error) {
        console.error(error);
        return null;
    }
}

const updateService = async (id, newDescription, newDuration, newPrice) => {
    // console.log(id);
    const resultUpdate = await models.servicos.update(
        { description: newDescription, duration: newDuration, price: newPrice },
        { where: { id } },
    );
    console.log(resultUpdate[0]);
    return resultUpdate[0];
};

module.exports = { getServicos, updateService, cadServico };