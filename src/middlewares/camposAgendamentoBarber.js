const payloadAgendamentoBarbeiro = async (req, res, next) => {
    const { data, horarioSelecionado, id_cliente, id_servico, duration } = req.body;

    if (!data || data.length !== 10) {
        console.log(data.length);
        return res.status(401).json({ message: 'Insira uma data' });
    }
    if (!horarioSelecionado || horarioSelecionado.length !== 5) {
        return res.status(401).json({ message: 'Insira um horario' });
    }
    if (!id_cliente || id_cliente.length <= 0) {
        return res.status(401).json({ message: 'Insira o id do cliente' });
    }
    if (!id_servico || !id_servico.length <= 0) {
        return res.status(401).json({ message: 'Insira um id do serviço' });
    }
    if (!duration || duration.length < 2) {
        return res.status(401).json({ message: 'Insira uma duração' });
    }
    next();
}

module.exports = { payloadAgendamentoBarbeiro };