const bcrypt = require('bcrypt');

const validCampoName = async (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return res.status(401).json({ message: 'Insira seu nome' });
    }

    if (name.length < 3) {
        return res.status(401).json({ message: 'Nome deve conter no mínimo 3 caracteres' });
    }

    next();
}
// valida os dados de acesso recebida na requisição login
const validCamposEmailPassLogin = async (req, res, next) => {
    const { email, password } = req.body;
    const isValid = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    if (!email || !isValid.test(email)) {
        return res.status(401).json({ message: 'Email invalido' });
    }

    if (!password || password.length < 6) {
        return res.status(401).json({ message: 'Insira uma senha com no mínimo 6 caracteres' });
    }

    next();
}

// valida a existencia e formato do login recebida na requisição de cadastro e criptgrafa
const validCamposEmailPass = async (req, res, next) => {
    const { email, password } = req.body;
    const isValid = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    if (!email || !isValid.test(email)) {
        return res.status(401).json({ message: 'Email invalido' });
    }

    if (!password || password.length < 6) {
        return res.status(401).json({ message: 'Insira uma senha com no mínimo 6 caracteres' });
    }

    // criptografa a senha usando o bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // adiciona a senha criptografada no objeto de requisição
    req.body.password = hashedPassword;

    next();
}

module.exports = { validCampoName, validCamposEmailPass, validCamposEmailPassLogin };