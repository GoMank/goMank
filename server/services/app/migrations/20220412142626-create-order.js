'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      invoiceNumber: {
        allowNull: false,
        type: Sequelize.STRING
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      orderStatus: {
        allowNull: false,
        type: Sequelize.STRING
      },
      paymentStatus: {
        allowNull: false,
        type: Sequelize.STRING
      },
      paymentMethod: {
        allowNull: false,
        type: Sequelize.STRING
      },
      clientId: {
        allowNull: false,
<<<<<<< HEAD
=======
        type: Sequelize.INTEGER
      },
      clientName: {
        allowNull: false,
>>>>>>> a26c0e223773b9418c96674b01ace49ff6f4bcae
        type: Sequelize.STRING
      },
      mamangId: {
        allowNull: false,
<<<<<<< HEAD
=======
        type: Sequelize.INTEGER
      },
      mamangName: {
        allowNull: false,
>>>>>>> a26c0e223773b9418c96674b01ace49ff6f4bcae
        type: Sequelize.STRING
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};