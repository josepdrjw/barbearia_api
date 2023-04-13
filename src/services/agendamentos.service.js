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

    // Essa função cria um novo array chamado horarios a partir do array horarios60min,
    const horarios = horarios60min.map( (objeto) => {
        return objeto.hora.substring(0, 5); // é aplicado a ela para retornar somente os cinco 
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
// caso o dia seja o dia atual é chamada esta função
const horariosDispon = (horaInicial, duracao, horaLimite, horariosReservados) => {

    const horaFinal = moment.tz(horaInicial, 'HH:mm', 'America/Sao_Paulo');
    const duracaoMoment = moment.duration(duracao, 'minutes');

    const horariosDisponiveis = [];

    // verifica se o horario atual é maior ou igual a 21H e menor que 2359 para 
    // garantir que continuará retornando o array vazio com a lista de horarios
    // pois o loop while abaixo so garante de remover os horario que ja se passaram
    // porem apartir das 21h o sistema ja reconhece como a data do dia seguinte mesmo ainda sendo
    // a data do dia atual
    const agora = moment.tz('America/Sao_Paulo');
    const horarioAtual = agora.format('HHmm');
    const horaAtualEmNumero = horarioAtual.replace(':', '').padStart(4, '0');
    const condicao = Number(horaAtualEmNumero) >= 2100 && Number(horaAtualEmNumero) < 2359;

    if (condicao) {
        return horariosDisponiveis;
    }

    // atribue na constante `horaAtual` o horario atual usando a biblioteca moment
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
    let diaAtual = hoje.getDate();


    const partesData = dia.split("-");
    const diaR = partesData[2];

    let diaNamber = Number(diaR)

    // if (diaNamber < diaAtual) {
    //     return 'dia passado';
    // }

    // pega a hora atual para caso o horario atual seja posterior as 21h ainda assim
    // forçar que a data atual se mantenha como a data atual de fato e não ja considere
    // a data do dia posterior
    const agora = moment.tz('America/Sao_Paulo');
    const horarioAtual = agora.format('HHmm');
    const horaAtualEmNumero = horarioAtual.replace(':', '').padStart(4, '0');
    const condicao = Number(horaAtualEmNumero) > 2100 && Number(horaAtualEmNumero) < 2359;


    if (condicao) {
        diaAtual -= 1;
    }

    console.log(diaAtual);

    if (diaNamber === diaAtual) {
        // console.log('O dia é atual verificaDiaAtual');
        console.log('atual hehe ');
        return true;
    } else {
        // console.log('Dia não atual verificaDiaAtual');
        console.log('nao atual ');
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

// const getAgendamentos = async (data) => {
//     const resultAgendamentos = await models.agendamentos.findAll({
//         where: {
//             data,
//             status: 'agendado',
//         },
//         order: [['data', 'ASC'], ['hora', 'ASC']]
//     });
//     return resultAgendamentos;
// };

const getAgendamentos = async (data, id) => {
    const resultAgendamentos = await models.agendamentos.findAll({
      where: {
        data,
        id_barbeiro: id,
        status: 'agendado',
      },
      include: [
        {
          model: models.barbeiros,
          attributes: ['id', 'name'], // traz apenas os atributos 'id' e 'nome' da tabela barbeiros
        },
        {
          model: models.servicos,
          attributes: ['id', 'description', 'price'], // traz apenas os atributos 'id' e 'descricao' da tabela servicos
        },
        {
            model: models.clientes,
            attributes: ['id', 'name', 'image'], // traz apenas os atributos 'id' e 'descricao' da tabela servicos
          },
      ],
      order: [['data', 'ASC'], ['hora', 'ASC']]
    });

    // const resultMatriz = resultAgendamentos.map(objeto => Object.values(objeto));

    return resultAgendamentos;
  };
  

const postAgendamento = async (payload) => {

    const resultAgendamento = await models.agendamentos.create(payload)
    return resultAgendamento;
    // return { service: {...dados} };
}

module.exports = { getHorarios, postAgendamento, getHorariosReservados, getAgendamentos };