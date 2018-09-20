'use strict';

module.exports = (sequelize, DataTypes) => {
  const TripDetails = sequelize.define('trip_details', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    active: {
      type: DataTypes.TINYINT(1),
      defaultValue: 1,
      allowNull: false
    },
    trip_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'trip',
        key: 'id'
      }
    },
    move_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'move',
        key: 'id'
      }
    },
    stop_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    sequence: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'trip_details'
  });
  return TripDetails;
};