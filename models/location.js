'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    active: DataTypes.TINYINT,
    customer_id: DataTypes.INTEGER,
    name: DataTypes.TEXT,
    address: DataTypes.TEXT,
    email: DataTypes.TEXT,
    phone: DataTypes.TEXT
  }, {});
  Location.associate = function(models) {
    models.Location.belongsTo(models.Customer, {foreignKey: 'customer_id'});
  };
  return Location;
};