/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */
module.exports = (sequelize, DataTypes) => {
    const barbeirosModel = sequelize.define('barbeiros', {
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
    },
    {
        underscored: false, //faz a converção de chaves de camelCase para snake_case
        timestamps: false,
    }
    );
    // userModel.associate = (models) => {
    //     userModel.hasMany(models.BlogPost, {
    //         foreignKey: 'userId',
    //         as: 'user',
    //     });
    // }
    return barbeirosModel;
};