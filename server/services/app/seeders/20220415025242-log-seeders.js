'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     const fs = require('fs')
     let data = JSON.parse(fs.readFileSync('./dummyFile/log.json', 'utf-8'))
     data.forEach(element => {
       element.createdAt = new Date()
       element.updatedAt = new Date()
     });
     await queryInterface.bulkInsert('Logs', data, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Logs', null, {});
  }
};
