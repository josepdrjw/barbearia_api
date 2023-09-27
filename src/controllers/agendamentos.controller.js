const service = require('../services/agendamentos.service');
const { getEmail } = require('../services/clientes.service');
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
    const { data, id } = req.params;
    const agendados = await service.getAgendamentos(data, id);
    // console.log(agendados);
    return res.status(200).json(agendados);
}

const getAgendId = async (req, res) => {
    const clienteId = req.body.usuariotoken.data.userId.id
    const { id } = req.params;
    const [resulAgend] = await service.getAgendaId(id);
    // CHECAR SE resultAgenda RETORNAR -> [] TRATA RETORNANDO [] 'ARRAY VAZIO'
    if (!resulAgend) {
        return res.status(200).json([]);
    }
    // AQUI VERIFICA SE QUEM ESTA FAZENDO A REQUISIÇÃO É O CLIENTE DO AGENDAMENTO RETORNANDO [] 'ARRAY VAZIO'
    if(resulAgend.id_cliente && resulAgend.id_cliente !== clienteId){
        return res.status(200).json([]);
    }
    return res.status(200).json(resulAgend);
}

const postAgendamento = async (req, res) => {
    const id_cliente = req.body.usuariotoken.data.userId.id
    const hora = req.body.horarioSelecionado;
    const { data, id_barbeiro, id_servico, duration } = req.body;
    const payload = { data, hora, id_cliente, id_barbeiro, id_servico, duration};

    const exist = await service.checkAgendamentoCliente(id_cliente);

    if (exist !== null) {
        return res.status(409).json({ message: "Você já possui um agendamento, Cancele para Reagendar" });
    }

    const horariosDisponiveis = await service.getHorariosReservados(data, id_barbeiro);

    const horaDisponivel = horariosDisponiveis.some(horario => horario === hora);

    if(horaDisponivel) {
        return res.status(404).json({ message: "horario já reservado, volte ao inicio e tente novamente." })
    }

    const resultAgendamento = await service.postAgendamento(payload);

    if (resultAgendamento.message) {
        return res.status(201).json({ message: resultAgendamento.message, agenda: resultAgendamento.agenda });
    }

    if (resultAgendamento === "Houve um erro, volte ao inicio e tente novamente.") {
        return res.status(500).json({ message: resultAgendamento })
    }

    const dados = req.body;
    const resultCad = await services.cadClientes(dados);
    // return res.status(201).json(exist);
    return res.status(201).json({message: resultAgendamento})
}

// FUNÇÃO DE AGENDAMENTO FEITO PELO BARBEIRO NO PROPRIO ACESSO DO BARBEIRO
const postBarberAgendamento = async (req, res) => {
    const id_barbeiro = req.body.usuariotoken.data.userId.id
    const hora = req.body.horarioSelecionado;
    const { data, id_cliente, id_servico, duration } = req.body;
    const payload = { data, hora, id_cliente, id_barbeiro, id_servico, duration};

    const exist = await service.checkAgendamentoCliente(id_cliente);

    if (exist !== null) {
        return res.status(409).json({ message: "Cliente já possui um agendamento, Cancele para Reagendar" });
    }

    const horariosDisponiveis = await service.getHorariosReservados(data, id_barbeiro);

    const horaDisponivel = horariosDisponiveis.some(horario => horario === hora);

    if(horaDisponivel) {
        return res.status(404).json({ message: "horario já reservado, volte ao inicio e tente novamente." })
    }

    const resultAgendamento = await service.postAgendamento(payload);

    if (resultAgendamento.message) {
        return res.status(201).json({ message: resultAgendamento.message, agenda: resultAgendamento.agenda });
    }

    if (resultAgendamento === "Houve um erro, volte ao inicio e tente novamente.") {
        return res.status(500).json({ message: resultAgendamento })
    }

    const dados = req.body;
    const resultCad = await services.cadClientes(dados);
    // return res.status(201).json(exist);
    return res.status(201).json({message: resultAgendamento})
}
// CANCELAMENTO DO AGENDAMENTO PELO PROPRIO CLIENTE
const cancelaAgendamento = async (req, res) => {
    const emailCliente = req.body.usuariotoken.data.userId.email;
    const id_cliente = req.body.usuariotoken.data.userId.id;
    const { id } = req.body;


    // const chekEmail = await getEmail(emailCliente);

    const chekAgendamento = await service.getAgendaId(id);

    if(chekAgendamento.length === 0) {
        return res.status(200).json({ message: 'Agendamento inexistente' });
    }

    if (chekAgendamento && chekAgendamento[0].id_cliente === id_cliente) {
        const cancelamento = await service.updateStatus(id, 'cancelado');
        return res.status(200).json({ message: 'Cancelado' });
    }

    if (chekAgendamento && chekAgendamento[0].id_cliente !== id_cliente) {
        return res.status(200).json({ message: 'Usuário não autorizado'  });
    }

}

// CANCELAMENTO DO AGENDAMENTO PELO PROPRIO BARBEIRO
const cancelaAgendamentoBarber = async (req, res) => {
    const emailCliente = req.body.usuariotoken.data.userId.email;
    const id_barbeiro = req.body.usuariotoken.data.userId.id;
    const { id } = req.body;


    // const chekEmail = await getEmail(emailCliente);

    const chekAgendamento = await service.getAgendaId(id);

    if(chekAgendamento.length === 0) {
        return res.status(200).json({ message: 'Agendamento inexistente' });
    }

    if (chekAgendamento && chekAgendamento[0].id_barbeiro === id_barbeiro) {
        const cancelamento = await service.updateStatus(id, 'cancelado');
        return res.status(200).json({ message: 'Cancelado' });
    }

    if (chekAgendamento && chekAgendamento[0].id_barbeiro !== id_barbeiro) {
        return res.status(200).json({ message: 'Usuário não autorizado'  });
    }

}

module.exports = { getHorarios, postAgendamento, postBarberAgendamento, getAgendamentos, getAgendId, cancelaAgendamento, cancelaAgendamentoBarber };
