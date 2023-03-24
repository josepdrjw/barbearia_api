module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('barbeiros',
      [
        {
          id: 1,
          name: 'Borges',
          email: 'borges@test.com',
          password: 'Bor123',
        },
        {
          id: 2,
          name: 'Marcelo',
          email: 'marcelo@test.com',
          password: 'Mar123',
        },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('barbeiros', null, {});
  },
};
