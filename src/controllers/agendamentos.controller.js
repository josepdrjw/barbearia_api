const service = require('../services/agendamentos.service');
// const moment = require('moment-timezone');

//Esta função recebe uma data e um id de um barbeiro por paramantos retorna os horarios disponiveis de acordo com a data e id_barbeiro passados por prarameto
const getHorarios = async (req, res) => {

    const { data, id } = req.params;
    
    // retorna um array com lista de horarios dispoinvel ja filtra removidos todos os horarios que ja sstão reservados
    const resultHoursDispon = await service.getHorarios(data, id);

    if (resultHoursDispon.length === 0) {
        return res.status(200).json([]);
    }
    // console.log();
    return res.status(200).json(resultHoursDispon);

    // return res.status(200).json({ idCliente: dados.usuariotoken.data.userId.id, barbeiros: [...resultBarbeiros ] });
}

// rota de buscade serviços agendados
const getAgendamentos = async (req, res) => {
    const { data } = req.params;
    const agendados= await service.getAgendamentos(data);
    console.log(agendados);
    return res.status(200).json(agendados);
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

module.exports = { getHorarios, postAgendamento, getAgendamentos };