'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('DriverPays', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      active: {
        type: Sequelize.TINYINT
      },
      region_code: {
        type: Sequelize.STRING
      },
      average_driver_speed: {
        type: Sequelize.DECIMAL
      },
      pay_per_kilometer: {
        type: Sequelize.DECIMAL
      },
      pay_per_minute: {
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
    return queryInterface.dropTable('DriverPays');
  }
};