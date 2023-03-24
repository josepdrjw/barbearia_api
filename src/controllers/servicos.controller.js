const service = require('../services/servicos.service');

const getServicos = async (req, res) => {
    const { id } = req.params;
    const resultServicos = await service.getServicos(id);
    // return res.status(200).json({ idCliente: dados.usuariotoken.data.userId.id, barbeiros: [...resultBarbeiros ] });
    return res.status(200).json(resultServicos);
}

module.exports = { getServicos };