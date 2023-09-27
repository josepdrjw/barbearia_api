const payloadAgendamento = async (req, res, next) => {
    const { data, horarioSelecionado, id_barbeiro, id_servico, duration } = req.body;

    if (!data || data.length !== 10) {
        console.log(data.length);
        return res.status(401).json({ message: 'Insira uma data' });
    }
    if (!horarioSelecionado || horarioSelecionado.length !== 5) {
        return res.status(401).json({ message: 'Insira um horario' });
    }
    if (!id_barbeiro || id_barbeiro.length <= 0) {
        return res.status(401).json({ message: 'Insira um id do barbeiro' });
    }
    if (!id_servico || !id_servico.length <= 0) {
        return res.status(401).json({ message: 'Insira um id do serviço' });
    }
    if (!duration || duration.length < 2) {
        return res.status(401).json({ message: 'Insira uma duração' });
    }
    next();
}

module.exports = { payloadAgendamento };