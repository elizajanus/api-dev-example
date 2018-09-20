'use strict';

module.exports = (sequelize, DataTypes) => {
  const RateRule = sequelize.define('rate_rule', {
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
    distance_start: {
      type: DataTypes.INTEGER(6),
      allowNull: false
    },
    distance_end: {
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
    }
  }, {
    tableName: 'rate_rule'
  });
  return RateRule;
};
