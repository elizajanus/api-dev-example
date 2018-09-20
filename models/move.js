'use strict';

module.exports = (sequelize, DataTypes) => {
  const Move = sequelize.define('move', {
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
    customer_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'customer',
        key: 'id'
      }
    },
    lane_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'lane',
        key: 'id'
      }
    }
  }, {
    tableName: 'move'
  });
  return Move;
};
