// const { uniq } = require('shelljs');

// /**
//  * 
//  * @param {import('sequelize').Sequelize} sequelize 
//  * @param {import('sequelize').DataTypes} DataTypes 
//  */
// module.exports = (sequelize, DataTypes) => {
//   const Agendamento = sequelize.define('agendamentos', {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     id_servico: {
//       type: DataTypes.INTEGER,
//       allowNull: false
//     },
//     id_barbeiro: {
//       type: DataTypes.INTEGER,
//       allowNull: false
//     },
//     id_cliente: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       unique: true
//     },
//     data: {
//       type: DataTypes.DATEONLY,
//       allowNull: false
//     },
//     hora: {
//       type: DataTypes.TIME,
//       allowNull: false
//     },
//     duration: {
//       allowNull: false,
//       type: DataTypes.INTEGER,

//     },
//     status: {
//       type: DataTypes.ENUM('Agendado', 'Concluido', 'Cancelado'),
//       allowNull: false,
//       defaultValue: 'Agendado'
//     },
//     createdAt: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: DataTypes.literal('NOW()')
//     },
//   }, {
//     tableName: 'agendamentos',
//     timestamps: false
//   });

//   // Agendamento.belongsTo(sequelize.models.clientes, { foreignKey: 'cliente_id' });

//   // Agendamento.associate = (models) => {
//   //   Agendamento.belongsTo(models.clientes, { foreignKey: 'cliente_id' });
//   // }

//   return Agendamento;
// };
// const { uniq } = require('shelljs');

/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */
module.exports = (sequelize, DataTypes) => {
  const Agendamento = sequelize.define('agendamentos', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_servico: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_barbeiro: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    data: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: false
    },
    duration: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0 // set a default value for the duration property
    },
    status: {
      type: DataTypes.ENUM('Agendado', 'Concluido', 'Cancelado'),
      allowNull: false,
      defaultValue: 'Agendado'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('NOW()')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('NOW()')
    }
    
  }, {
    tableName: 'agendamentos',
    timestamps: true
  });

  // Agendamento.belongsTo(sequelize.models.clientes, { foreignKey: 'cliente_id' });

  // Agendamento.associate = (models) => {
  //   Agendamento.belongsTo(models.clientes, { foreignKey: 'cliente_id' });
  // }

  return Agendamento;
};

