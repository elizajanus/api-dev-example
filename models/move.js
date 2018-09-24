'use strict';
module.exports = (sequelize, DataTypes) => {
  const Move = sequelize.define('Move', {
    active: DataTypes.TINYINT,
    trip_id: DataTypes.INTEGER,
    customer_id: DataTypes.INTEGER,
    lane_id: DataTypes.INTEGER
  }, {});
  Move.associate = function(models) {
    models.Move.belongsTo(models.Customer, {foreignKey: 'customer_id'});
    models.Move.belongsTo(models.Trip, {foreignKey: 'trip_id'});
    models.Move.belongsTo(models.Lane, {foreignKey: 'lane_id'});
  };
  return Move;
};