const service = require('../services/barbeiros.service');

const getBarbers = async (req, res) => {
    const dados = req.body;
    const resultBarbeiros = await service.getBarbers();
    // return res.status(200).json({ idCliente: dados.usuariotoken.data.userId.id, barbeiros: [...resultBarbeiros ] });
    return res.status(200).json(resultBarbeiros);
}

module.exports = { getBarbers };