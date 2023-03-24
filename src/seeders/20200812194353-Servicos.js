module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('servicos',
      [
        {
          id: 1,
          barbeiro_id: 1,
          description: 'Cabelo',
          duration: 30,
          price: 35.00,
        },
        {
          id: 2,
          barbeiro_id: 2,
          description: 'Cabelo',
          duration: 30,
          price: 25.00,
        },
        {
          id: 3,
          barbeiro_id: 1,
          description: 'Cabelo + barba',
          duration: 60,
          price: 60.00,
        },
        {
          id: 4,
          barbeiro_id: 2,
          description: 'Cabelo + barba',
          duration: 60,
          price: 50.00,
        },
        // {
        //   id: 2,
        //   title: 'Vamos que vamos',
        //   content: 'Foguete não tem ré',
        //   user_id: 1,
        //   published: new Date('2011-08-01T19:58:00.000Z'),
        //   updated: new Date('2011-08-01T19:58:51.000Z'),
        // },
      ]);
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('servicos', null, {});
  },
};
