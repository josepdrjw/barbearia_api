// // /**
// //  * 
// //  * @param {import('sequelize').Sequelize} sequelize 
// //  * @param {import('sequelize').DataTypes} DataTypes 
// //  */
// // module.exports = (sequelize, DataTypes) => {
// //     const clientesModel = sequelize.define('clientes', {
// //         id: {
// //             allowNull: false,
// //             autoIncrement: true,
// //             primaryKey: true,
// //             type: DataTypes.INTEGER,
// //         },
// //         name: {
// //             type: DataTypes.STRING,
// //             allowNull: false,
// //         },
// //         email: {
// //             type: DataTypes.STRING,
// //             allowNull: false,
// //         },
// //         password: {
// //             type: DataTypes.STRING,
// //             allowNull: false,
// //         },
// //         image: {
// //             type: DataTypes.STRING,
// //             allowNull: true,
// //         },
// //     },
// //     {
// //         underscored: false, //faz a converção de chaves de camelCase para snake_case
// //         timestamps: false,
// //     }
// //     );
// //     // userModel.associate = (models) => {
// //     //     userModel.hasMany(models.BlogPost, {
// //     //         foreignKey: 'userId',
// //     //         as: 'user',
// //     //     });
// //     // }
// //     return clientesModel;
// // };

// /**
//  * @param {import('sequelize').Sequelize} sequelize 
//  * @param {import('sequelize').DataTypes} DataTypes 
//  */
// module.exports = (sequelize, DataTypes) => {
//     const Cliente = sequelize.define('clientes', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: DataTypes.INTEGER,
//       },
//       name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       image: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//     }, {
//       underscored: false,
//       timestamps: false,
//     });
  
//     Cliente.hasMany(sequelize.models.agendamentos, { foreignKey: 'id_cliente' });
  
//     return Cliente;
//   };


/**
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */
module.exports = (sequelize, DataTypes) => {
    const Cliente = sequelize.define('clientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    }, {
      underscored: false,
      timestamps: false,
    });
  
    Cliente.hasMany(sequelize.models.agendamentos, { foreignKey: 'id_cliente' });
  
    return Cliente;
};
