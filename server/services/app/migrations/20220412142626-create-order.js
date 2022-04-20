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
      service: {
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
>>>>>>> bb037b366554c7bd603e6f8b81329dfa92ea31fa
        type: Sequelize.STRING
      },
      mamangId: {
        allowNull: false,
<<<<<<< HEAD
        type: Sequelize.STRING
=======
        type: Sequelize.INTEGER
>>>>>>> bb037b366554c7bd603e6f8b81329dfa92ea31fa
      },
      date: {
        allowNull: false,
        type: Sequelize.STRING
      },
      time: {
        allowNull: false,
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