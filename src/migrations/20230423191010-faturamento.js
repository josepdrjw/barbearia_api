'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('faturamento', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      id_barbeiro: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'barbeiros',
          key: 'id'
        }
      },
      id_cliente: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'clientes',
          key: 'id'
        }
      },
      id_servico: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'servicos',
          key: 'id'
        }
      },
      serv_adicional: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'servicos',
          key: 'id'
        }
      },
      data: {
        type: Sequelize.DATE,
        allowNull: false
      },
      hora: {
        type: Sequelize.TIME,
        allowNull: false
      },
      total: {
        allowNull: false,
        type: Sequelize.DECIMAL,
      },
      forma_pagamento: {
        type: Sequelize.ENUM('dinheiro', 'pix', 'cartao'),
        allowNull: false,
        defaultValue: 'dinheiro'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('faturamento');
  }
};
