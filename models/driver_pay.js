'use strict';

module.exports = (sequelize, DataTypes) => {
  const DriverPay = sequelize.define('driver_pay_config', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    region_code: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    average_drive_speed: {
      type: DataTypes.DECIMAL(6, 3),
      allowNull: false
    },
    pay_per_kilometer: {
      type: DataTypes.DECIMAL(6, 3),
      allowNull: false
    },
    pay_per_minute: {
      type: DataTypes.DECIMAL(6, 3),
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
      allowNull: false
    }
  }, {
    tableName: 'driver_pay_config'
  });
  return DriverPay;
};
