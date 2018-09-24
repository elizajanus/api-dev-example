'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('TripDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      active: {
        type: Sequelize.TINYINT
      },
      trip_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Trip',
          key: 'id'
        }
      },
      move_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Move',
          key: 'id'
        }
      },
      stop_id: {
        type: Sequelize.INTEGER
      },
      sequence: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('TripDetails');
  }
};