'use strict';
module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define('Trip', {
    active: DataTypes.TINYINT,
    customer_id: DataTypes.INTEGER
  }, {});
  Trip.associate = function(models) {
    models.Trip.belongsTo(models.Customer, {foreignKey: 'customer_id'});
  };
  return Trip;
};