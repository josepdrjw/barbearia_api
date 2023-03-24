module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('clientes',
      [{
        id: 1,
        name: 'Lewis Hamilton',
        email: 'cliente1@gmail.com',
        password: '123456',
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
      },
      {
        id: 2,
        name: 'Michael Schumacher',
        email: 'cliente2@gmail.com',
        password: '123456',
        image: 'https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg',
      },
      {
        id: 15,
        name: 'José Wemerson',
        email: 'josepdrjw@gmail.com',
        password: 'Jw190390!',
        image: 'https://i.imgur.com/fIlSlcB.jpg',
      },
      
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('clientes', null, {});
  },
};
