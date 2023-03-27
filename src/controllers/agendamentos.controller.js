const service = require('../services/agendamentos.service');
const moment = require('moment-timezone');

// retorna os horarios disponiveis de acordo com a data e id_barbeiro passados por prarameto
const getHorarios = async (req, res) => {
    // const { id } = req.params;
    // const dia = '2023-04-01';
    const { data, id } = req.params;
    const hourR = await service.getHorariosReservados(data, id); // horarios reservados
    const resultAgendamentos = await service.ultimoAgendado(data, id, hourR);
    // return res.status(200).json({ idCliente: dados.usuariotoken.data.userId.id, barbeiros: [...resultBarbeiros ] });
    return res.status(200).json(resultAgendamentos);
    // return res.status(200).json({ message: 'estou no controller' });
}

const postAgendamento = async (req, res) => {
    const id_cliente = req.body.usuariotoken.data.userId.id
    const hora = req.body.horarioSelecionado;
    const { data, id_barbeiro, id_servico, duration } = req.body;
    const payload = { data, hora, id_cliente, id_barbeiro, id_servico, duration};
    const resultAgendamento = await service.postAgendamento(payload);

    if (!resultAgendamento) {
        return res.status(404).json({ message: 'Deu ruim' });
    }

    // const dados = req.body;
    // const resultCad = await services.cadClientes(dados);
    return res.status(201).json(resultAgendamento);
}

module.exports = { getHorarios, postAgendamento };