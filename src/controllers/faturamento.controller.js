const {
  createFaturamento,
  getBillingDay,
  getBillingMensal,
  getBillingMensalGeral,
  getBillingMonGeneral,
  updateFaturamento
} = require('../services/faturamento.service');
const { getEmail } = require('../services/barbeiros.service');
const { updateStatus } = require('../services/agendamentos.service');
const moment = require('moment-timezone');
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

  if (create === "Erro ao salvar atendimento") {
    return res.status(500).json({ message: create });
  }

}

// FATURAMENTO DO DIA
const getInvoiceDay = async (req, res) => {
  // const id = req.params.id;
  const { id, data } = req.params;
  const idNumber = Number(id)
  const email_barbeiro = req.body.usuariotoken.data.userId.email;


  let newDia;
  let newData;

  const partes = data.split('-');
  const ano = partes[0];
  const mes = partes[1];
  const dia = partes[2];
  // verifica se o horario atual é maior ou igual a 21H e menor que 2359 para 
  // garantir que continuará retornando o array vazio com a lista de horarios
  // pois o loop while abaixo so garante de remover os horario que ja se passaram
  // porem apartir das 21h o sistema ja reconhece como a data do dia seguinte mesmo ainda sendo
  // a data do dia atual
  const agora = moment.tz('America/Sao_Paulo');
  const horarioAtual = agora.format('HHmm');
  const horaAtualEmNumero = horarioAtual.replace(':', '').padStart(4, '0');
  const condicao = Number(horaAtualEmNumero) >= 2100 && Number(horaAtualEmNumero) < 2359;

  if(condicao){
    newDia = Number(dia) -1;
    newData = `${ano}-${mes.toString().padStart(2, '0')}-${newDia.toString().padStart(2, '0')}`;
  }

  if (!condicao) {
    newDia = Number(dia);
    newData = `${ano}-${mes.toString().padStart(2, '0')}-${newDia.toString().padStart(2, '0')}`;
  }

  const checkEmail = await getEmail(email_barbeiro)
  if (!checkEmail.email || checkEmail.email !== email_barbeiro) {
    return res.status(404).json({ message: 'Usuario não autorizado' });
  }

  if (checkEmail.id !== idNumber) {
    return res.status(404).json({ message: 'Usuario não autorizado' });
  }

  const resultInvoice = await getBillingDay(idNumber, newData);
  // return res.status(200).json({ newData });
  return res.status(200).json({resultInvoice})
}

// RETORNAR FATURAMENTO GERAL DO BARBEIRO
const faturaMesBarberId = async (req, res) => {
  const id_barber = req.body.usuariotoken.data.userId.id // id barbeiro
  const email_barbeiro = req.body.usuariotoken.data.userId.email;

  const checkEmail = await getEmail(email_barbeiro)
  if (!checkEmail.email || checkEmail.email !== email_barbeiro) {
    return res.status(404).json({ message: 'Usuario não autorizado' });
  }

  if (checkEmail.id !== Number(id_barber)) {
    return res.status(404).json({ message: 'Usuario não autorizado' });
  }

  // if (Number(checkEmail.nivel) !== 1 ) {
  //   return res.status(404).json({ message: 'Autorizado somente para o administrador' });
  // }


  const resultFaturaMes = await getBillingMensal(id_barber);
  return res.status(200).json({resultFaturaMes})
}

// RETORNAR FATURAMENTO MENSAL TOTAL DA BARBEARIA
const faturaMensalGeral= async (req, res) => {
  const id_barber = req.body.usuariotoken.data.userId.id // id barbeiro
  const email_barbeiro = req.body.usuariotoken.data.userId.email;

  const checkEmail = await getEmail(email_barbeiro)
  if (!checkEmail.email || checkEmail.email !== email_barbeiro) {
    return res.status(404).json({ message: 'Usuario não autorizado' });
  }

  if (checkEmail.id !== Number(id_barber)) {
    return res.status(404).json({ message: 'Usuario não autorizado' });
  }

  if (Number(checkEmail.nivel) !== 1 ) {
    return res.status(404).json({ message: 'Autorizado somente para o administrador' });
  }


  const resultFaturaMes = await getBillingMensalGeral();
  return res.status(200).json({resultFaturaMes})
}

const faturamentoPeriodo = async (req, res) => {
  const id_barber = req.body.usuariotoken.data.userId.id // id barbeiro
  const email_barbeiro = req.body.usuariotoken.data.userId.email;
  const { id, de, ate } = req.params;

  const partesDe = de.split('-');
  const deFormatado = partesDe[2] + '-' + partesDe[1] + '-' + partesDe[0];

  const partesAte = ate.split('-');
  const ateFormatado = partesAte[2] + '-' + partesAte[1] + '-' + partesAte[0];


  const checkEmail = await getEmail(email_barbeiro);
  if (!checkEmail.email || checkEmail.email !== email_barbeiro) {
    return res.status(404).json({ message: 'Usuario não autorizado' });
  }

  if (checkEmail.id !== Number(id_barber)) {
    return res.status(404).json({ message: 'Usuario não autorizado' });
  }

  // if (Number(checkEmail.nivel) !== 1 ) {
  //   return res.status(404).json({ message: 'Autorizado somente para o administrador' });
  // }

  const result = await getBillingMonGeneral(id, deFormatado, ateFormatado);

  return res.status(200).json({ result });

}

const updateRegisFatur = async (req, res) => {
  const email_barbeiro = req.body.usuariotoken.data.userId.email;
  const {id, descricao, total, forma_pagamento} = req.body;

  const checkEmail = await getEmail(email_barbeiro)

  if (!checkEmail.email || checkEmail.email !== email_barbeiro) {
    return res.status(404).json({ message: 'Usuario não autorizado' });
  }

  if (checkEmail.id !== 1) {
    return res.status(404).json({ message: 'Usuario não autorizado' });
  }

  const resultUpdate = await updateFaturamento(id, descricao, total, forma_pagamento);
  return res.status(200).json(resultUpdate);
}

module.exports = { postFaturamento, getInvoiceDay, faturaMesBarberId, faturaMensalGeral, faturamentoPeriodo, updateRegisFatur };