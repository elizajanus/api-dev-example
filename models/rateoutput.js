'use strict';
module.exports = (sequelize, DataTypes) => {
  const RateOutput = sequelize.define('RateOutput', {
    active: {
      type: DataTypes.TINYINT,
      defaultValue: true },
    customer_id: DataTypes.INTEGER,
    move_id: DataTypes.INTEGER,
    matched_lane_id: DataTypes.INTEGER,
    matched_rule_id: DataTypes.INTEGER,
    distance_start: DataTypes.INTEGER,
    distance_end: DataTypes.INTEGER,
    actual_distance: DataTypes.INTEGER,
    lane_distance: DataTypes.INTEGER,
    rate: DataTypes.DECIMAL,
    type: DataTypes.TEXT,
    class: DataTypes.TEXT,
    sla: DataTypes.TEXT,
    price: DataTypes.DECIMAL
  }, {});
  RateOutput.associate = function(models) {
    models.RateOutput.belongsTo(models.Customer, {foreignKey: 'customer_id'});
    models.RateOutput.belongsTo(models.Move, {foreignKey: 'move_id'});
    models.RateOutput.belongsTo(models.Lane, {foreignKey: 'matched_lane_id'});
    models.RateOutput.belongsTo(models.RateRule, {foreignKey: 'matched_rule_id'});
  };
  return RateOutput;
};