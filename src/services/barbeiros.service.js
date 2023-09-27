const models = require('../models');

const cadUsuario = async (dados) => {

    try {
        const resultCriaUsua = await models.barbeiros.create(dados)
        return resultCriaUsua;
    } catch (error) {
        return 'Erro ao cadastrar'
    }
}

const getBarbeiros = async (email) => {
    // const corpo = { email, password };
    // findOne método que obtem a primeira entrada que encontra
    const resultEmail = await models.barbeiros.findAll({
        attributes: {
            exclude: ['password', 'email'],
        }
    });
    // return login;
    // const result = `Email: ${email} Senha: ${password}`;
    // consolo.log(corpo);
    // console.log(`result ${result}`);
    return resultEmail;
};

const getEmail = async (email) => {
    // const corpo = { email, password };
    // findOne método que obtem a primeira entrada que encontra
    const resultEmail = await models.barbeiros.findOne({ where: { email } });
    // return login;
    // const result = `Email: ${email} Senha: ${password}`;
    // consolo.log(corpo);
    // console.log(`result ${result}`);
    return resultEmail;
};

const updatePass = async (email, newPassword) => {
    const resultUpdate = await models.barbeiros.update(
        { password: newPassword },
        { where: { email } }
    );
    return resultUpdate[0];
};

const updateImg = async (email, newImage) => {
    const resultUpdate = await models.barbeiros.update(
        { image: newImage },
        { where: { email } }
    );
    return resultUpdate[0];
};

module.exports = { getBarbeiros, getEmail, updatePass, updateImg, cadUsuario };