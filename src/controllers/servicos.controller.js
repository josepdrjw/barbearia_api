const { getServicos, cadServico, updateService } = require('../services/servicos.service');
const { getEmail } = require('../services/barbeiros.service');

const getAllServicos = async (req, res) => {
    const { id } = req.params;
    const resultServicos = await getServicos(id);
    // return res.status(200).json({ idCliente: dados.usuariotoken.data.userId.id, barbeiros: [...resultBarbeiros ] });
    return res.status(200).json(resultServicos);
}

const cadastroServico = async (req, res) => {
    const { barbeiro_id, description, duration, price } = req.body;
    const email = req.body.usuariotoken.data.userId.email;

    const dados = { barbeiro_id, description, duration, price };

    const consulta = await getEmail(email);

    if (!consulta || consulta.email !== email) {
        return res.status(404).json({ message: 'Usuário invalido' });
    }

    const resultaCad = await cadServico(dados);

    if (resultaCad === null) {
        return res.status(409).json({ message: 'Erro' });
    }

    return res.status(201).json({ message: resultaCad });
}

const update = async (req, res) => {
    const { id, description, duration, price } = req.body;
    const email = req.body.usuariotoken.data.userId.email;

    const consulta = await getEmail(email);

    if (!consulta || consulta.email !== email) {
        return res.status(404).json({ message: 'Usuário invalido' });
    }

    // console.log(`email: ${email} senha: ${newPassword}`);
    const resultUpdate = await updateService(id, description, duration, price);
    return res.status(200).json(resultUpdate);
}

module.exports = { getAllServicos, cadastroServico, update };