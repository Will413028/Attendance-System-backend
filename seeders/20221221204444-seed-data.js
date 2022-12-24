'use strict';

const bcrypt = require('bcryptjs');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {name: 'admin', account: 'admin', password: bcrypt.hashSync('tiadmin', bcrypt.genSaltSync(10), null), role: 'HR', createdAt: new Date(), updatedAt: new Date()},
      {name: 'employee1', account: 'employee1', password: bcrypt.hashSync('titaner', bcrypt.genSaltSync(10), null), role: 'employee', createdAt: new Date(), updatedAt: new Date()},
      {name: 'employee2', account: 'employee2', password: bcrypt.hashSync('titaner', bcrypt.genSaltSync(10), null), role: 'employee', createdAt: new Date(), updatedAt: new Date()}
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
