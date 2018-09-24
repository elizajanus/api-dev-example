'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Lanes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
      description: {
        type: Sequelize.TEXT
      },
      origin_location_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'location',
          key: 'id'
        }
      },
      destination_location_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'location',
          key: 'id'
        }
      },
      distance: {
        type: Sequelize.INTEGER
      },
      duration: {
        type: Sequelize.INTEGER
      },
      driver_base_pay: {
        type: Sequelize.DECIMAL
      },
      driver_return_pay: {
        type: Sequelize.DECIMAL
      },
      tolls: {
        type: Sequelize.DECIMAL
      },
      driver_pay_per_minute: {
        type: Sequelize.DECIMAL
      },
      driver_pay_per_kilometer: {
        type: Sequelize.DECIMAL
      },
      average_drive_speed: {
        type: Sequelize.DECIMAL
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
    return queryInterface.dropTable('Lanes');
  }
};