'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Locations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tookan_id: {
        type: Sequelize.INTEGER
      },
      active: {
        type: Sequelize.TINYINT
      },
      customer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Customer',
          key: 'id'
        }
      },
      name: {
        type: Sequelize.TEXT
      },
      address: {
        type: Sequelize.TEXT
      },
      email: {
        type: Sequelize.TEXT
      },
      phone: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Locations');
  }
};