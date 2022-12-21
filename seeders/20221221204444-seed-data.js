'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {name: 'admin', account: 'admin', password: 'tiadmin', role: 'HR'},
      {name: 'employee1', account: 'employee1', password: 'titaner', role: 'employee'},
      {name: 'employee2', account: 'employee2', password: 'titaner', role: 'employee'}
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
