/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */
module.exports = (sequelize, DataTypes) => {
  const Servicos = sequelize.define('servicos', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    barbeiro_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'barbeiros',
        key: 'id'
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
  }, {
    tableName: 'servicos',
    timestamps: false
  });
  
  Servicos.associate = (models) => {
    Servicos.belongsTo(models.barbeiros, { foreignKey: 'barbeiro_id' });
  }

  return Servicos;
};