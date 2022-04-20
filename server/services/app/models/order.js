'use strict';
const { Model } = require('sequelize');
const localizer = require('../helpers/dateLocalizer')

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.hasMany(models.Log, {foreignKey: 'orderId'})
    }
  }
  Order.init({
    invoiceNumber: {
      type: DataTypes.STRING,
      defaultValue: "INV",
      // allowNull: false,
      // validate: {
      //   notNull: {
      //     args: true,
      //     msg: 'Invoice Number is null'
      //   },
      //   notEmpty: {
      //     args: true,
      //     msg: 'Invoice Number cannot be empty'
      //   }
      // }
    },
    service: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 50000,
      // allowNull: false,
      // validate: {
      //   notNull: {
      //     args: true,
      //     msg: 'Price input is null'
      //   },
      //   notEmpty: {
      //     args: true,
      //     msg: 'Price cannot be empty'
      //   }
      // }
    },
    orderStatus: {
      type: DataTypes.STRING,
      defaultValue: 'Received',
      // allowNull: false,
      // validate: {
      //   isIn: {
      //     args:[['Received', 'Done', 'Cancelled']],
      //     msg: 'Order Status must be either Received , Done or Cancelled'
      //   }, 
      //   notNull: {
      //     args: true,
      //     msg: 'Order Status is null'
      //   },
      //   notEmpty: {
      //     args: true,
      //     msg: 'Order Status cannot be empty'
      //   }
      // }
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args:[['Cash', 'Cashless']],
          msg:'Payment method must be either Cash or Cashless'
        }, 
        notNull: {
          args: true,
          msg: 'Payment Method cannot be empty'
        }
      }
    },
    paymentStatus: {
      type: DataTypes.STRING,
      defaultValue: "Unpaid",
      // allowNull: false,
      // validate: {
      //   isIn: [['Paid', 'Unpaid']], 
      //   notNull: {
      //     args: true,
      //     msg: 'Payment Status is null'
      //   },
      //   notEmpty: {
      //     args: true,
      //     msg: 'Payment Status cannot be empty'
      //   }
      // }
    },
    clientId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Client ID cannot be empty'
        }
      }
    },
    mamangId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Mamang ID cannot be empty'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Address cannot be empty'
        }
      }
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Date cannot be empty'
        }
      }
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Time cannot be empty'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Order',
  });

  Order.beforeCreate((instance, options) => {
    const {date, invNumber} = localizer()
    instance.invoiceNumber = `INV-${invNumber}-${date}`;
  })

  return Order;
};