'use strict';
module.exports = (sequelize, DataTypes) => {
  const Lane = sequelize.define('Lane', {
    active: {
      type: DataTypes.TINYINT,
      defaultValue: true },
    customer_id: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    origin_location_id: DataTypes.INTEGER,
    destination_location_id: DataTypes.INTEGER,
    distance_miles: DataTypes.INTEGER,
    duration_sec: DataTypes.INTEGER,
    pickup_inspection_sec: DataTypes.INTEGER,
    delivery_inspection_sec: DataTypes.INTEGER,
    return_ride_wait_sec: DataTypes.INTEGER,
    driver_time_pay: DataTypes.DECIMAL,
    driver_drive_pay: DataTypes.DECIMAL,
    driver_base_pay_discount: DataTypes.DECIMAL,
    driver_base_pay: DataTypes.DECIMAL,
    driver_return_pay_discount: DataTypes.DECIMAL,
    driver_return_pay: DataTypes.DECIMAL,
    insurance_cost_per_mile: DataTypes.DECIMAL,
    insurance_cost: DataTypes.DECIMAL,
    estimated_rideshare_return_cost: DataTypes.DECIMAL,
    tolls: DataTypes.DECIMAL,
    driver_rake: DataTypes.DECIMAL,
    driver_pay_per_minute: DataTypes.DECIMAL,
    driver_pay_per_kilometer: DataTypes.DECIMAL,
    driver_pay_per_mile: DataTypes.DECIMAL,
    average_drive_speed_min_per_mile: DataTypes.DECIMAL,
    average_drive_speed_mph: DataTypes.DECIMAL,
    dealer_base_rate: DataTypes.DECIMAL,
    dealer_base_rate_type: DataTypes.DECIMAL,
    dealer_base_discount: DataTypes.DECIMAL,
    dealer_base_price: DataTypes.DECIMAL,
    dealer_stranded_rate: DataTypes.DECIMAL,
    dealer_stranded_rate_type: DataTypes.DECIMAL,
    dealer_stranded_discount: DataTypes.DECIMAL,
    dealer_stranded_price: DataTypes.DECIMAL
  }, {});
  Lane.associate = function(models) {
    models.Lane.belongsTo(models.Customer, { foreignKey: 'customer_id'});
    models.Lane.belongsTo(models.Location, { as: 'pickup', foreignKey: 'origin_location_id'});
    models.Lane.belongsTo(models.Location, { as: 'delivery', foreignKey: 'destination_location_id'});
    models.Lane.hasMany(models.Move, { as: 'lane', foreignKey: 'lane_id'});
  };
  return Lane;
};