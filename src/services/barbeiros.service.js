const models = require('../models');

const getBarbers = async (email) => {
    // const corpo = { email, password };
    // findOne método que obtem a primeira entrada que encontra
    const resultEmail = await models.barbeiros.findAll({ attributes: {
        exclude: ['password', 'email'],
    } });
    // return login;
    // const result = `Email: ${email} Senha: ${password}`;
    // consolo.log(corpo);
    // console.log(`result ${result}`);
    return resultEmail;
};

module.exports = { getBarbers };