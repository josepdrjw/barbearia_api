const { getEmail } = require('../services/clientes.service');
const enviarEmail = require('../sendMail/send');
const { env } = require('shelljs');

const verficaEmailEnviaLink = async (req, res) => {
    const { email } = req.body;
    const consulta = await getEmail(email);

    if (!consulta || consulta.email !== email) {
        return res.status(404).json({ message: 'Email invalido' });
    }

    const envio = await enviarEmail(email);

    if (envio === `Link enviado para: ${consulta.email}`) {
        return res.status(200).json({ message: envio })
    }

    return res.status(404).json({ message: envio })

}

module.exports = verficaEmailEnviaLink;