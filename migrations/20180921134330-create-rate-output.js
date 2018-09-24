'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RateOutputs', {
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
      move_id: {
        type: Sequelize.TEXT
      },
      matched_lane_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Lane',
          key: 'id'
        }
      },
      matched_rule_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'RateRule',
          key: 'id'
        }
      },
      distance_start: {
        type: Sequelize.INTEGER
      },
      distance_end: {
        type: Sequelize.INTEGER
      },
      actual_distance: {
        type: Sequelize.INTEGER
      },
      lane_distance: {
        type: Sequelize.INTEGER
      },
      rate: {
        type: Sequelize.DECIMAL
      },
      type: {
        type: Sequelize.TEXT
      },
      class: {
        type: Sequelize.TEXT
      },
      sla: {
        type: Sequelize.TEXT
      },
      price: {
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
    return queryInterface.dropTable('RateOutputs');
  }
};