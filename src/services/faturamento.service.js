const models = require('../models');
const { Op, Sequelize } = require('sequelize');

const moment = require('moment-timezone');

// Define o timezone padrão para 'America/Sao_Paulo'
moment.tz.setDefault('America/Sao_Paulo');


const createFaturamento = async (payload) => {

  try {
    const resultInsert = await models.faturamento.create(payload)
    return 'Atendimento salvo com sucesso';
  } catch (error) {
    return 'Erro ao salvar atendimento'
  }
  // return { service: {...dados} };
}

const getBillingDay = async (id, day) => {
  const faturadoDay = await models.faturamento.findAll({
    where: {
      id_barbeiro: id,
      data: {
        [Op.between]: [
          new Date(`${day}T00:00:00Z`), // data inicial às 00:00:00
          new Date(`${day}T23:59:59Z`)  // data final às 23:59:59
        ]
      }
    },
    include: [
      {
        model: models.servicos,
        attributes: ['id', 'description', 'price'], // traz apenas os atributos 'id' e 'descricao' da tabela servicos
      },
      {
        model: models.servicos,
        as: 'servicoAdicional',
        attributes: ['id', 'description', 'price'],
      },
      {
        model: models.clientes,
        attributes: ['id', 'name', 'image'], // traz apenas os atributos 'id' e 'descricao' da tabela servicos
      },
    ],
  });

  return [...faturadoDay];
}

// const getBillingMensal = async (mes) => {
//   const faturadoDay = await models.faturamento.findAll({
//     where: {
//       id_barbeiro: 1,
//       data: {
//         [Op.between]: [
//           new Date(`${day}T00:00:00Z`),
//           new Date(`${day}T23:59:59Z`)
//         ]
//       }
//     },
//     include: [
//       {
//         model: models.servicos,
//         attributes: ['id', 'description', 'price'], // traz apenas os atributos 'id' e 'descricao' da tabela servicos
//       },
//       {
//         model: models.servicos,
//         as: 'servicoAdicional',
//         attributes: ['id', 'description', 'price'],
//       },
//       {
//         model: models.clientes,
//         attributes: ['id', 'name', 'image'], // traz apenas os atributos 'id' e 'descricao' da tabela servicos
//       },
//     ],
//   });

//   Percorre cada faturamento e adiciona o valor de servico.adicional, se existir
//   faturadoDay.forEach((faturamento) => {
//     if (faturamento.servico && faturamento.servico.adicional) {
//       faturamento.serv_adicional = faturamento.servico.adicional;
//     }
//   });


// };

const getBillingMensal = async (id) => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
  const faturadoDay = await models.faturamento.findAll({
    where: {
      id_barbeiro: id,
      data: {
        [Op.between]: [startOfMonth, endOfMonth]
      }
    },
    include: [
      {
        model: models.servicos,
        attributes: ['id', 'description', 'price'], // traz apenas os atributos 'id' e 'descricao' da tabela servicos
      },
      {
        model: models.servicos,
        as: 'servicoAdicional',
        attributes: ['id', 'description', 'price'],
      },
      {
        model: models.clientes,
        attributes: ['id', 'name', 'image'], // traz apenas os atributos 'id' e 'descricao' da tabela servicos
      },
    ],
  });
  return faturadoDay;
};

// RETORNA TODOS OS REGISTRO DE FATURAMENTO DO MES ATUAL DE TODOS OS BARBEIROS
const getBillingMensalGeral = async () => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
  const faturadoDay = await models.faturamento.findAll({
    where: {
      // id_barbeiro: id,
      data: {
        [Op.and]: [
          { [Op.gte]: startOfMonth },
          { [Op.lte]: new Date() }
        ]
      }
    },
    include: [
      {
        model: models.servicos,
        attributes: ['id', 'description', 'price'], // traz apenas os atributos 'id' e 'descricao' da tabela servicos
      },
      {
        model: models.servicos,
        as: 'servicoAdicional',
        attributes: ['id', 'description', 'price'],
      },
      {
        model: models.clientes,
        attributes: ['id', 'name', 'image'], // traz apenas os atributos 'id' e 'descricao' da tabela servicos
      },
    ],
  });
  return faturadoDay;
};

// RETORN TODOS OS REGISTRO DE FATURAMENTO DE UM BARBEIRO ESPECIFIO 'ID' 'DATA INICIAL' 'DATA FINAL'
// const getBillingMonGeneral = async (id, de, ate) => {
//   console.log(ate);
//   const faturadoDay = await models.faturamento.findAll({
//     where: {
//       id_barbeiro: id,
//       data: {
//         [Op.between]: [
//           new Date(`${de}T00:00:00Z`), // data inicial às 00:00:00
//           new Date(`${ate}T23:59:59.999Z`)  // data final às 23:59:59.999
//         ]
//       }
//     },
//     include: [
//       {
//         model: models.servicos,
//         attributes: ['id', 'description', 'price'], // traz apenas os atributos 'id' e 'descricao' da tabela servicos
//       },
//       {
//         model: models.servicos,
//         as: 'servicoAdicional',
//         attributes: ['id', 'description', 'price'],
//       },
//       {
//         model: models.clientes,
//         attributes: ['id', 'name', 'image'], // traz apenas os atributos 'id' e 'descricao' da tabela servicos
//       },
//     ],
//   });

//   return [...faturadoDay];
// }

const getBillingMonGeneral = async (id, de, ate) => {
  const faturadoDay = await models.faturamento.findAll({
    where: {
      id_barbeiro: id,
      data: {
        [Op.gte]: new Date(`${de}T00:00:00Z`), // data inicial às 00:00:00
        [Op.lte]: new Date(`${ate}T23:59:59Z`)  // data final às 23:59:59
      }
    },
    include: [
      {
        model: models.servicos,
        attributes: ['id', 'description', 'price'], // traz apenas os atributos 'id' e 'descricao' da tabela servicos
      },
      {
        model: models.servicos,
        as: 'servicoAdicional',
        attributes: ['id', 'description', 'price'],
      },
      {
        model: models.clientes,
        attributes: ['id', 'name', 'image'], // traz apenas os atributos 'id' e 'descricao' da tabela servicos
      },
    ],
  });

  return [...faturadoDay];
}

const updateFaturamento = async (id, newDescription, newTotal, newForm) => {
  // console.log(id);
  const resultUpdate = await models.faturamento.update(
    { description: newDescription, total: newTotal, forma_pagamento: newForm },
    { where: { id } },
  );
  console.log(resultUpdate[0]);
  return resultUpdate[0];
};

module.exports = { createFaturamento, getBillingDay, getBillingMensal, getBillingMensalGeral, getBillingMonGeneral, updateFaturamento };