'use strict';

module.exports = (sequelize, DataTypes) => {
  const RateOutput = sequelize.define('rate_output', {
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
    customer_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'customer',
        key: 'customer_id'
      }
    },
    move_id: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    matched_lane_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'lane',
        key: 'id'
      }
    },
    matched_rule_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'rate_rule',
        key: 'id'
      }
    },
    distance_start: {
      type: DataTypes.INTEGER(6),
      allowNull: false
    },
    distance_end: {
      type: DataTypes.INTEGER(6),
      allowNull: false
    },
    actual_distance: {
      type: DataTypes.INTEGER(6),
      allowNull: false
    },
    lane_distance: {
      type: DataTypes.INTEGER(6),
      allowNull: false
    },
    rate: {
      type: DataTypes.DECIMAL(6,3),
      allowNull: false
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    class: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    sla: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(6,3),
      allowNull: false
    }
  }, {
    tableName: 'rate_output'
  });
  return RateOutput;
};
