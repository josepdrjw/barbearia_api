const bcrypt = require('bcrypt');
const { getEmail, updatePass } = require('../services/barbeiros.service');
const enviarEmail = require('../sendMail/sendBarber');

// const { env } = require('shelljs');
const { tokenProvisiorio } = require('../auth/Token/tokenProvisorio');

const verficaEmailEnviaLink = async (req, res) => {
    const { email } = req.body;
    const consulta = await getEmail(email);

    if (!consulta || consulta.email !== email) {
        return res.status(404).json({ message: 'Email invalido' });
    }

    let token = tokenProvisiorio({ id: consulta.dataValues.id, email: consulta.dataValues.email })

    const envio = await enviarEmail(email, consulta.name, token);

    if (envio === `Olá ${consulta.name} este é um email automatico de redefinição de senha Token: ${token}`) {
        return res.status(200).json({ message: `Link enviado para: ${consulta.email}` })
    }

    return res.status(200).json({ message: envio })

}

const redefinir = async (req, res) => {
    const { password } = req.body;
    const email = req.body.usuariotoken.data.userId.email

    const consulta = await getEmail(email);

    if (!consulta || consulta.email !== email) {
        return res.status(404).json({ message: 'Email invalido' });
    }

    const newPassword = await bcrypt.hash(password, 10);

    const resultUpdate = await updatePass(email, newPassword)
    // console.log(`email: ${email} senha: ${newPassword}`);
    return res.status(200).json(resultUpdate);
}

module.exports = { verficaEmailEnviaLink, redefinir };