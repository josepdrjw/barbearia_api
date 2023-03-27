const models = require('../models');
const moment = require('moment-timezone');

// Define o timezone padrão para 'America/Sao_Paulo'
moment.tz.setDefault('America/Sao_Paulo');

// recebe uma data e um id do barbeiro e verifica os
// horarios do barbeiro na data passada
const getHorariosReservados = async (dia, id) => {
    const horariosReservados = await models.agendamentos.findAll({
        where: {
            id_barbeiro: id,
            data: dia,
            status: 'agendado',
        },
        attributes: {
            exclude: [
                'id',
                'id_servico',
                'id_barbeiro',
                'id_cliente',
                'data',
                'duration',
                'status',
                'createdAt',
                'updatedAt',
            ],
        }
    });

    const horarios = horariosReservados.map(function (objeto) {
        return objeto.hora.substring(0, 5);
    });

    return horarios;
};

function verificaDiaAtual(dia) {
    const hoje = new Date();
    const diaAtual = hoje.getDate();

    if (dia === diaAtual) {
        return true;
    } else {
        return false;
    }
}

const verificaDiaSemana = (dia) => {
    const data = new Date(dia);
    const diaSemana = data.getDay();

    if (diaSemana === 6) {
        return 'sabado';
    }

    if (diaSemana === 0) {
        return 'domingo';
    }

    if (diaSemana != 0 && diaSemana != 6) {
        return 'é dia de segunda a sexta';
    }
};

const horariosDiasFuturos = (horaInicial, duracao, horaLimite, hourR) => {

    const horaFinal = moment(horaInicial, 'HH:mm');
    const duracaoMoment = moment.duration(duracao, 'minutes');
    // const horaLimiteMoment = moment(horaLimite);

    const horariosDisponiveis = [];

    while (horaFinal.format('HH:mm') <= horaLimite) {
        horariosDisponiveis.push(horaFinal.clone().format('HH:mm'));
        horaFinal.add(duracaoMoment);
    }

    if (hourR) {
        const horariosDisponiveisAtualizados = horariosDisponiveis.filter(horario => !hourR.includes(horario));

        return horariosDisponiveisAtualizados;
    }

    return horariosDisponiveis;


}

const horariosDispon = (horaInicial, duracao, horaLimite, _hourR) => {

    const horaFinal = moment.tz(horaInicial, 'HH:mm', 'America/Sao_Paulo');
    const duracaoMoment = moment.duration(duracao, 'minutes');

    const horariosDisponiveis = [];

    const horaAtual = moment.tz('America/Sao_Paulo');

    while (horaFinal.format('HH:mm') <= horaLimite) {
        if (horaFinal.isAfter(horaAtual)) {
            horariosDisponiveis.push(horaFinal.clone().format('HH:mm'));
        }
        horaFinal.add(duracaoMoment);
    }

    return horariosDisponiveis;
};

const ultimoAgendado = async (dia, idBarbeiro, hourR) => {
    // const dia = moment.tz(data, 'YYYY-MM-DD').startOf('day').toDate();
    const ultimoAgendado = await models.agendamentos.findOne({
        where: {
            id_barbeiro: idBarbeiro,
            status: 'agendado',
            data: dia
        },
        order: [['hora', 'DESC']],
        limit: 1,
    });

    console.log(`strdia ${dia}`);

    // caso seja passado um dia futuro e que não existe nenhuma agendamento
    if (!ultimoAgendado) {
        const diaSemana = verificaDiaSemana(dia);

        let horaIncio = '';
        let intervalo = 0;
        let hourLimit = '';

        if (diaSemana === 'é dia de segunda a sexta') {
            horaIncio = '09:00';
            intervalo = 30;
            hourLimit = '19:30';
            // return horariosDispon(horaIncio, intervalo, hourLimit);
        }

        if (diaSemana === 'sabado') {
            horaIncio = '09:00';
            intervalo = 30;
            hourLimit = '17:30';
        }

        if (diaSemana === 'domingo') {
            return { message: 'Nenhum Horario disponivel ao domingos' };
        }

        const horariosDisponiveis = horariosDiasFuturos(horaIncio, intervalo, hourLimit);

        return horariosDisponiveis;
    }

    // extrai apenas hora:minutos ex: converte '09:30:00' para '09:30'
    console.log(`Dia passado no parameto  ${dia}`);
    console.log(`Resultdo  ${ultimoAgendado ? ultimoAgendado.hora : 'não existe'}`);
    const ultimoHorario = ultimoAgendado.hora.substring(0, 5);
    console.log(ultimoHorario);

    // cria um objeto Moment.js para representar um horario.
    // O horario é difinido como horario local no formato '08:25' 'HH:mm'
    const hora = moment.tz(ultimoHorario, 'HH:mm', 'America/Sao_Paulo');

    // cria um objeto Moment.js para representar a duraçao em minutos
    // const duracao = moment.duration(ultimoAgendado.duration, 'minutes'); // Obs duração do serviço do ultimo agendamento

    // clona o objeto Moment.js que representa o horario inicial que foi agendado
    // e adiciona a duração
    // e o resultado é criando um novo objeto Moment.js que ira representar o horario final
    // const dataHoraFinal = hora.clone().add(duracao); // Obs representa o horario final do ultimo agendamento

    // const hour = dataHoraFinal.format('HH:mm');

    const hourFinalFormat = '09:00';
    const intervalo = 30;
    let hourLimit = '';

    // const today = moment.tz('America/Sao_Paulo');

    const diaSemana = verificaDiaSemana(dia);

    if (diaSemana === 0) {
        // domingo
        return { message: 'Nenhum Horario disponivel ao domingos aqui' };
    }

    if (diaSemana === 6) {
        // sabado
        hourLimit = '17:30';
    }

    if (diaSemana != 0 && diaSemana != 6) {

        // é de segunda a sexta
        hourLimit = '19:30';
    }

    const verificaDiAtual = await verificaDiaAtual(dia)

    if (verificaDiAtual) {
        console.log('O dia é Atual');
        const horariosDisponiveis = await horariosDispon(hourFinalFormat, intervalo, hourLimit, hourR);
        return horariosDisponiveis;
    }

    console.log('Dia futuro');
    const horariosDisponiveis = await horariosDiasFuturos(hourFinalFormat, intervalo, hourLimit, hourR);
    return horariosDisponiveis;

};

const getAgendamentos = async (id) => {
    const resultAgendamentos = await models.agendamentos.findAll({
        where: {
            id_barbeiro: id,
            status: 'agendado',
        },
        order: [['data', 'ASC'], ['hora', 'ASC']]
    });
    return resultAgendamentos;
};

const postAgendamento = async (payload) => {

    const resultAgendamento = await models.agendamentos.create(payload)
    return resultAgendamento;
    // return { service: {...dados} };
}

module.exports = { getAgendamentos, ultimoAgendado, postAgendamento, getHorariosReservados };