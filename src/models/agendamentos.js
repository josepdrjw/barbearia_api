// // const { uniq } = require('shelljs');

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
//       unique: true,
//       references: {
//         model: 'clientes',
//         key: 'id',
//     },
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
//       defaultValue: sequelize.literal('NOW()')
//     },
//   }, {
//     tableName: 'agendamentos',
//     timestamps: false
//   });

//   Agendamento.belongsTo(sequelize.models.clientes, { foreignKey: 'id_cliente' });

//   Agendamento.associate = (models) => {
//     Agendamento.belongsTo(models.clientes, { foreignKey: 'id_cliente' });
//   }

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
      allowNull: false,
      references: {
        model: 'servicos',
        key: 'id'
      }
    },
    id_barbeiro: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'barbeiros',
        key: 'id',
    },
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'clientes',
        key: 'id',
    },
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

  // Agendamento.belongsTo(sequelize.models.clientes, { foreignKey: 'id_cliente' });

  Agendamento.associate = (models) => {
    Agendamento.belongsTo(models.clientes, { foreignKey: 'id_cliente' });
    Agendamento.belongsTo(models.barbeiros, { foreignKey: 'id_barbeiro' });
    Agendamento.belongsTo(models.servicos, { foreignKey: 'id_servico' });
  }
  

  return Agendamento;
};

