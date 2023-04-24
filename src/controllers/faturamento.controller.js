const { createFaturamento } = require('../services/faturamento.service');
const { getEmail } = require('../services/barbeiros.service');
const { updateStatus } = require('../services/agendamentos.service');
// const moment = require('moment-timezone');

const postFaturamento = async (req, res) => {
    const id_barber = req.body.usuariotoken.data.userId.id // id barbeiro
    const email_barbeiro = req.body.usuariotoken.data.userId.email //email do barbeiro obtido do token

    const { id_agendamento, id_cliente, id_servico, serv_adicional, data, hora, total, forma_pagamento } = req.body;

    const checkEmail = await getEmail(email_barbeiro)
    if (!checkEmail.email || checkEmail.email !== email_barbeiro) {
        return res.status(404).json({ message: 'Usuario não autorizado' });
    }
    // const hora = req.body.horarioSelecionado;
    // const { data, id_barbeiro, id_servico, duration } = req.body;
    // const payload = { data, hora, id_barbeiro, id_barbeiro, id_servico, duration};
    // const resultAgendamento = await service.postAgendamento(payload);

    // if (!resultAgendamento) {
    //     return res.status(404).json({ message: 'Deu ruim' });
    // }

    // const dados = req.body;
    // const resultCad = await services.cadClientes(dados);

    const payload = {
        id_barbeiro: id_barber,
        id_cliente,
        id_servico,
        serv_adicional,
        data,
        hora,
        total,
        forma_pagamento,
    }

    const create = await createFaturamento(payload)

    if (create === "Atendimento salvo com sucesso") {

        await updateStatus(id_agendamento, "Concluido")

        return res.status(201).json({ message: create });
    }

    if(create === "Erro ao salvar atendimento") {
        return res.status(500).json({ message: create });
    }

}

module.exports = { postFaturamento };