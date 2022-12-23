'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {name: 'admin', account: 'admin', password: 'tiadmin', role: 'HR', createdAt: new Date(), updatedAt: new Date()},
      {name: 'employee1', account: 'employee1', password: 'titaner', role: 'employee', createdAt: new Date(), updatedAt: new Date()},
      {name: 'employee2', account: 'employee2', password: 'titaner', role: 'employee', createdAt: new Date(), updatedAt: new Date()}
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
