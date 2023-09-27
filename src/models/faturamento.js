/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */
module.exports = (sequelize, DataTypes) => {
    const Faturamento = sequelize.define('faturamento', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        id_barbeiro: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'barbeiros',
                key: 'id'
            }
        },
        id_cliente: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'clientes',
                key: 'id'
            }
        },
        id_servico: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'servicos',
                key: 'id'
            }
        },
        serv_adicional: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'servicos',
                key: 'id'
            }
        },
        data: {
            type: DataTypes.DATE,
            allowNull: false
        },
        hora: {
            type: DataTypes.TIME,
            allowNull: false
        },
        total: {
            allowNull: false,
            type: DataTypes.DECIMAL,
        },
        forma_pagamento: {
            type: DataTypes.ENUM('dinheiro', 'pix', 'cartao'),
            allowNull: false,
            defaultValue: 'dinheiro'
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        }

    }, {
        tableName: 'faturamento',
        timestamps: true
    });

    Faturamento.associate = (models) => {
        Faturamento.belongsTo(models.clientes, { foreignKey: 'id_cliente' });
        Faturamento.belongsTo(models.servicos, { foreignKey: 'serv_adicional', as: 'servicoAdicional', targetKey: 'id' });
        Faturamento.belongsTo(models.barbeiros, { foreignKey: 'id_barbeiro' });
        Faturamento.belongsTo(models.servicos, { foreignKey: 'id_servico' });
    }


    return Faturamento;
};