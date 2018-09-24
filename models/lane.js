'use strict';
module.exports = (sequelize, DataTypes) => {
  const Lane = sequelize.define('Lane', {
    active: DataTypes.TINYINT,
    customer_id: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    origin_location_id: DataTypes.INTEGER,
    destination_location_id: DataTypes.INTEGER,
    distance: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
    driver_base_pay: DataTypes.DECIMAL,
    driver_return_pay: DataTypes.DECIMAL,
    tolls: DataTypes.DECIMAL,
    driver_pay_per_minute: DataTypes.DECIMAL,
    driver_pay_per_kilometer: DataTypes.DECIMAL,
    average_drive_speed: DataTypes.DECIMAL
  }, {});
  Lane.associate = function(models) {
    models.Lane.belongsTo(models.Customer, {foreignKey: 'customer_id'});
    models.Lane.belongsTo(models.Location, {foreignKey: 'origin_location_id'});
    models.Lane.belongsTo(models.Location, {foreignKey: 'destination_location_id'});
  };
  return Lane;
};