'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Log.belongsTo(models.Order, {foreignKey: 'orderId'})
    }
  }
  Log.init({
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Order ID input is null'
        },
        notEmpty: {
          args: true,
          msg: 'Order ID cannot be empty'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Description is null'
        },
        notEmpty: {
          args: true,
          msg: 'Description cannot be empty'
        }
      }
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: 'Created',
      allowNull: false,
      validate: {
        isIn: [['Created', 'Done', 'Cancelled']], 
        notNull: {
          args: true,
          msg: 'Type of Log change is null'
        },
        notEmpty: {
          args: true,
          msg: 'Type of Log change cannot be empty'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Log',
  });
  return Log;
};