module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('barbeiros',
      [
        {
          id: 1,
          name: 'Borges',
          email: 'Jbdsfborges@icloud.com',
          password: '$2b$10$IlRCOZ8F3c2XaZ6QpGbgn.3AKYK6gmQVONSDH4Aq/S633zef7g2i6',
          image: null,
          nivel: 1,
        }
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('barbeiros', null, {});
  },
};
