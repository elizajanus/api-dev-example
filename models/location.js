'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    tookan_id : DataTypes.INTEGER,
    active: {
      type: DataTypes.TINYINT,
      defaultValue: true },
    customer_id: DataTypes.INTEGER,
    name: DataTypes.TEXT,
    address: DataTypes.TEXT,
    email: DataTypes.TEXT,
    phone: DataTypes.TEXT
  }, {});
  Location.associate = function(models) {
    models.Location.belongsTo(models.Customer, {foreignKey: 'customer_id'});
    models.Location.hasMany(models.Lane, { foreignKey: 'origin_location_id'});
    models.Location.hasMany(models.Lane, { foreignKey: 'destination_location_id'});
  };
  return Location;
};