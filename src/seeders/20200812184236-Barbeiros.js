module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('barbeiros',
      [
        {
          id: 1,
          name: 'Borges',
          email: 'josepdrjw@bol.com.br',
          password: 'Bor123',
          image: null,
          nivel: 1,
        }
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('barbeiros', null, {});
  },
};
