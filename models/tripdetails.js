'use strict';
module.exports = (sequelize, DataTypes) => {
  const TripDetails = sequelize.define('TripDetails', {
    active: DataTypes.TINYINT,
    trip_id: DataTypes.INTEGER,
    move_id: DataTypes.INTEGER,
    stop_id: DataTypes.INTEGER,
    sequence: DataTypes.INTEGER
  }, {});
  TripDetails.associate = function(models) {
    models.TripDetails.belongsTo(models.Trip, {foreignKey: 'trip_id'});
    models.TripDetails.belongsTo(models.Move, {foreignKey: 'move_id'});
  };
  return TripDetails;
};