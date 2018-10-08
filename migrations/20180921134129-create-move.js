'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Moves', {
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
      pickup_time: {
        type: Sequelize.TEXT
      },
      delivery_time: {
        type: Sequelize.TEXT
      },
      pickup_stop_id: {
        type: Sequelize.TEXT,
      },
      delivery_stop_id: {
        type: Sequelize.TEXT,
      },
      sequence: {
        type: Sequelize.INTEGER,
      },
      customer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Customer',
          key: 'id'
        }
      },
      tookan_relationship_id: {
        type: Sequelize.TEXT
      },
      class: {
        type: Sequelize.TEXT
      },
      lane_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Lane',
          key: 'id'
        }
      },
      vehicle_year: {
        type: Sequelize.TEXT
      },
      vehicle_make: {
        type: Sequelize.TEXT
      },
      vehicle_model: {
        type: Sequelize.TEXT
      },
      vehicle_color: {
        type: Sequelize.TEXT
      },
      vehicle_stock: {
        type: Sequelize.TEXT
      },
      vehicle_vin: {
        type: Sequelize.TEXT
      },
      vehicle_odometer: {
        type: Sequelize.TEXT
      },
      vehicle_image: {
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
    return queryInterface.dropTable('Moves');
  }
};