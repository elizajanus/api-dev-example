'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    active: DataTypes.TINYINT,
    name: DataTypes.TEXT,
    email: DataTypes.TEXT,
    address: DataTypes.TEXT,
    phone: DataTypes.TEXT
  }, {});
  Customer.associate = function(models) {

  };
  return Customer;
};