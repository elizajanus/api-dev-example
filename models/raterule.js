'use strict';
module.exports = (sequelize, DataTypes) => {
  const RateRule = sequelize.define('RateRule', {
    active: DataTypes.TINYINT,
    customer_id: DataTypes.INTEGER,
    distance_start: DataTypes.INTEGER,
    distance_end: DataTypes.INTEGER,
    rate: DataTypes.DECIMAL,
    type: DataTypes.TEXT,
    class: DataTypes.TEXT
  }, {});
  RateRule.associate = function(models) {
    models.RateRule.belongsTo(models.Customer, {foreignKey: 'customer_id'});
  };
  return RateRule;
};