const models = require('../models');
const moment = require('moment-timezone');

// Define o timezone padrão para 'America/Sao_Paulo'
moment.tz.setDefault('America/Sao_Paulo');


const getHourDura30min = async (dia, id) => {

    // lista todos os agendamentos que possuem uma duração de 60 minutos
    const horarios60min = await models.agendamentos.findAll({
        where: {
            id_barbeiro: id,
            data: dia,
            status: 'agendado',
            duration: 60
        },
        attributes: {
            exclude: [
                // 'id',
                // 'id_servico',
                // 'id_barbeiro',
                // 'id_cliente',
                // 'data',
                // 'duration',
                // 'status',
                'createdAt',
                'updatedAt',
            ],
        }
    });

    const horarios = horarios60min.map(function (objeto) {
        return objeto.hora.substring(0, 5);
    });
    
    const duracao = 30;

    const novoHorarios = horarios.map(horario => {
        return moment(`2023-03-27T${horario}:00`).add(duracao, 'minutes').format('HH:mm');
    });

    return novoHorarios;
}

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

// lista somente os agendamentos que a duração do serviço seja = 60 'minutos'

const horariosDiasFuturos = (horaInicial, duracao, horaLimite, horariosReservados) => {

    const horaFinal = moment(horaInicial, 'HH:mm');
    const duracaoMoment = moment.duration(duracao, 'minutes');
    // const horaLimiteMoment = moment(horaLimite);

    const horariosDisponiveis = [];

    while (horaFinal.format('HH:mm') <= horaLimite) {
        horariosDisponiveis.push(horaFinal.clone().format('HH:mm'));
        horaFinal.add(duracaoMoment);
    }

    if (horariosReservados) {
        const horariosDisponiveisAtualizados = horariosDisponiveis.filter(horario => !horariosReservados.includes(horario));

        return horariosDisponiveisAtualizados;
    }

    return horariosDisponiveis;


}

const horariosDispon = (horaInicial, duracao, horaLimite, horariosReservados) => {

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

    if (horariosReservados) {
        const horariosDisponiveisAtualizados = horariosDisponiveis.filter(horario => !horariosReservados.includes(horario));

        return horariosDisponiveisAtualizados;
    }

    return horariosDisponiveis;
};

// verifica se é o dia atual
const verificaDiaAtual = (dia) => {
    const hoje = new Date();
    const diaAtual = hoje.getDate();


    const partesData = dia.split("-");
    const diaR = partesData[2];

    const diaNamber = Number(diaR)

    // if (diaNamber < diaAtual) {
    //     return 'dia passado';
    // }

    if (diaNamber === diaAtual) {
        // console.log('O dia é atual verificaDiaAtual');
        // console.log(typeof diaR);
        return true;
    } else {
        // console.log('Dia não atual verificaDiaAtual');
        // console.log(typeof diaR);
        return false;
    }

}


// verifica dia da semana
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

const getHorarios = async (dia, idBarbeiro) => {

    // se não existe horario reservado no dia passado retorna um array lista c/horarios reservados 
    const horariosReservados = await getHorariosReservados(dia, idBarbeiro);

    // lista de horarios de agedamentos com duração de 60 ja tratados ex: 'agendamento.duration + 30 minutos'
    const horariosDuracao60 = await getHourDura30min(dia, idBarbeiro);

    const todosHorariosIndisponiveis = horariosReservados.concat(horariosDuracao60);;

    // if (horariosDuracao60) {
    //     todosHorariosIndisponiveis = horariosReservados.concat(horariosDuracao60);
    // }
    
    console.log(`hora indisp juntos ${todosHorariosIndisponiveis}`);

    // se não existir nenhum horario reservados pode disponibiilzar todos os horarios
    // if (!horariosReservados[0]) {

    //     // verifica od dia da semana
    //     const diaSemana = verificaDiaSemana(dia);

    //     const intervalo = 30;
    //     let horaIncio = ''; // guardará horaInicio='horario de inicio de expediente'
    //     let hourLimit = '';


    //     // Horario inicio e fim dos expediente de Segunda a Sexta 
    //     if (diaSemana === 'é dia de segunda a sexta') {
    //         horaIncio = '09:00';
    //         hourLimit = '19:30';
    //     }

    //     // Horario inicio e fim dos expediente de Sabado
    //     if (diaSemana === 'sabado') {
    //         horaIncio = '09:00';
    //         hourLimit = '17:30';
    //     }

    //     // Retorno caso data seja um Domingo
    //     if (diaSemana === 'domingo') {
    //         return { message: 'Nenhum Horario disponivel ao domingos' };
    //     }

    //     // garda os horarios filtrados removidos os horarios reservados
    //     const horariosDisponiveis = horariosDiasFuturos(horaIncio, intervalo, hourLimit);

    //     return horariosDisponiveis;
    // }

    const hourFinalFormat = '09:00';
    const intervalo = 30;
    let hourLimit = '';


    // 
    const diaSemana = verificaDiaSemana(dia);
    console.log(diaSemana);

    // if (diaSemana === 0) {
    //     // domingo
    //     return { message: 'Nenhum Horario disponivel ao domingos aqui' };
    // }

    
    // Retorno caso data seja um Domingo
    if (diaSemana === 'domingo') {
        return { message: 'Nenhum Horario disponivel ao domingos' };
    }

    if (diaSemana === 'é dia de segunda a sexta') {

        // é de segunda a sexta
        hourLimit = '19:30';
    }

    if (diaSemana === 'sabado') {
        // sabado
        hourLimit = '17:30';
    }

    const diaAtual = await verificaDiaAtual(dia);
    // console.log(`Dia é atual?: ${verificaDiAtual}`);

    // if (diaAtual === 'dia passado') {
    //     return []
    // }

    if (diaAtual) {
        console.log('Dia Atual');
        if (todosHorariosIndisponiveis.length > 0) {
            const horariosDisponiveis = await horariosDispon(hourFinalFormat, intervalo, hourLimit, todosHorariosIndisponiveis);
            return horariosDisponiveis;
        }

        const horariosDisponiveis = await horariosDispon(hourFinalFormat, intervalo, hourLimit, horariosReservados);
        return horariosDisponiveis;
    }

    if (!diaAtual) {
        console.log('O dia Futuro');
        if (todosHorariosIndisponiveis.length > 0) {
            const horariosDisponiveis = await horariosDiasFuturos(hourFinalFormat, intervalo, hourLimit, todosHorariosIndisponiveis);
            return horariosDisponiveis;
        }

        const horariosDisponiveis = await horariosDiasFuturos(hourFinalFormat, intervalo, hourLimit, horariosReservados);
        return horariosDisponiveis;
    }


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

module.exports = { getAgendamentos, getHorarios, postAgendamento, getHorariosReservados };