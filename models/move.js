'use strict';
module.exports = (sequelize, DataTypes) => {
  const Move = sequelize.define('Move', {
    active: {
      type: DataTypes.TINYINT,
      defaultValue: true },
    trip_id: DataTypes.INTEGER,
    pickup_time: DataTypes.TEXT,
    delivery_time: DataTypes.TEXT,
    pickup_stop_id: DataTypes.TEXT,
    delivery_stop_id: DataTypes.TEXT,
    sequence: DataTypes.INTEGER,
    customer_id: DataTypes.INTEGER,
    tookan_relationship_id: DataTypes.TEXT,
    class: DataTypes.TEXT,
    lane_id: DataTypes.INTEGER,
    vehicle_year: DataTypes.TEXT,
    vehicle_make: DataTypes.TEXT,
    vehicle_model: DataTypes.TEXT,
    vehicle_color: DataTypes.TEXT,
    vehicle_stock: DataTypes.TEXT,
    vehicle_vin: DataTypes.TEXT,
    vehicle_odometer: DataTypes.TEXT,
    vehicle_image: DataTypes.TEXT
  }, {});
  Move.associate = function(models) {
    models.Move.belongsTo(models.Customer, {foreignKey: 'customer_id'});
    models.Move.belongsTo(models.Trip, { as: 'moves', foreignKey: 'trip_id'});
    models.Move.belongsTo(models.Lane, { as: 'lane', foreignKey: 'lane_id'});
  };
  return Move;
};