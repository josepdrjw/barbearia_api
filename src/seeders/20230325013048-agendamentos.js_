'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('agendamentos',
      [
        {
          id: 1,
          data: '2023-03-24',
          hora: '09:00:00',
          id_cliente: 15,
          id_barbeiro: 1,
          id_servico: 1,
          status: 'Agendado',
          createdAt: new Date(),
          updatedAt: new Date(),
          duration: 30,
        },
        {
          id: 2,
          data: '2023-03-24',
          hora: '09:00:00',
          id_cliente: 14,
          id_barbeiro: 2,
          id_servico: 4,
          status: 'Agendado',
          createdAt: new Date(),
          updatedAt: new Date(),
          duration: 60,
        },
        {
          id: 3,
          data: '2023-03-24',
          hora: '09:30:00',
          id_cliente: 16,
          id_barbeiro: 1,
          id_servico: 3,
          status: 'Agendado',
          createdAt: new Date(),
          updatedAt: new Date(),
          duration: 60,
        },
      ]);
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('agendamentos', null, {});
  },
};
