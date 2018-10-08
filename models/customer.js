'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    active: {
      type: DataTypes.TINYINT,
      defaultValue: true },
    name: DataTypes.TEXT,
    email: DataTypes.TEXT,
    address: DataTypes.TEXT,
    phone: DataTypes.TEXT
  }, {});
  Customer.associate = function(models) {
    // models.Customer.belongsTo(models.Trip, {as: 'customer', foreignKey: 'customer_id'});
  };
  return Customer;
};