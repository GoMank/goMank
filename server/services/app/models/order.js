'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    invoiceNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Invoice Number is null'
        },
        notEmpty: {
          args: true,
          msg: 'Invoice Number cannot be empty'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Price input is null'
        },
        notEmpty: {
          args: true,
          msg: 'Price cannot be empty'
        }
      }
    },
    orderStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['Received', 'Done', 'Canceled']], 
        notNull: {
          args: true,
          msg: 'Order Status is null'
        },
        notEmpty: {
          args: true,
          msg: 'Order Status cannot be empty'
        }
      }
    },
    paymentStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['Paid', 'Unpaid']], 
        notNull: {
          args: true,
          msg: 'Payment Status is null'
        },
        notEmpty: {
          args: true,
          msg: 'Payment Status cannot be empty'
        }
      }
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Client ID input is null'
        },
        notEmpty: {
          args: true,
          msg: 'Client ID cannot be empty'
        }
      }
    },
    clientName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Client Name is null'
        },
        notEmpty: {
          args: true,
          msg: 'Client Name cannot be empty'
        }
      }
    },
    mamangId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Mamang ID input is null'
        },
        notEmpty: {
          args: true,
          msg: 'Mamang ID cannot be empty'
        }
      }
    },
    mamangName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Mamang Name is null'
        },
        notEmpty: {
          args: true,
          msg: 'Mamang Name cannot be empty'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Address is null'
        },
        notEmpty: {
          args: true,
          msg: 'Address cannot be empty'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Order',
  });

  Order.beforeCreate((instance, options) => {
    instance.invoiceNumber = 'INV-'
    instance.price = 50000
    instance.orderStatus = 'Received'
    instance.paymentStatus = 'Unpaid'
  })

  return Order;
};