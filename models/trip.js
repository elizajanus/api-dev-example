'use strict';
module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define('Trip', {
    active: {
      type: DataTypes.TINYINT,
      defaultValue: true },
    customer_id: DataTypes.INTEGER
  }, {});
  Trip.associate = function(models) {
    models.Trip.belongsTo(models.Customer, {foreignKey: 'customer_id'});
    models.Trip.hasMany(models.Move, {as: 'moves', foreignKey: 'trip_id'});
  };
  return Trip;
};