'use strict';
module.exports = (sequelize, DataTypes) => {
  const DriverPay = sequelize.define('DriverPay', {
    active: {
      type: DataTypes.TINYINT,
      defaultValue: true },
    region_code: DataTypes.STRING,
    average_driver_speed: DataTypes.DECIMAL,
    pay_per_kilometer: DataTypes.DECIMAL,
    pay_per_minute: DataTypes.DECIMAL
  }, {});
  DriverPay.associate = function(models) {
    models.DriverPay.belongsTo(models.Customer, {foreignKey: 'customer_id'});
  };
  return DriverPay;
};