'use strict';

module.exports = (sequelize, DataTypes) => {
  const Lane = sequelize.define('lane', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    customer_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'customer',
        key: 'customer_id'
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    origin_location_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'location',
        key: 'id'
      }
    },
    destination_location_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'location',
        key: 'id'
      }
    },
    distance: {
      type: DataTypes.INTEGER(6),
      allowNull: false
    },
    duration: {
      type: DataTypes.INTEGER(6),
      allowNull: false
    },
    driver_base_pay: {
      type: DataTypes.DECIMAL(6, 3),
      allowNull: false
    },
    driver_return_pay: {
      type: DataTypes.DECIMAL(6, 3),
      allowNull: false
    },
    tolls: {
      type: DataTypes.DECIMAL(6, 3),
      allowNull: false
    },
    driver_pay_per_minute: {
      type: DataTypes.DECIMAL(6, 3),
      allowNull: false
    },
    driver_pay_per_kilometer: {
      type: DataTypes.DECIMAL(6, 3),
      allowNull: false
    },
    average_drive_speed: {
      type: DataTypes.DECIMAL(6, 3),
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
      allowNull: false
    }
  }, {
    tableName: 'lane'
  });
  return Lane;
};
