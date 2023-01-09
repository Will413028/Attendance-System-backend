'use strict';

const bcrypt = require('bcryptjs');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      { name: 'admin', account: 'admin', password: bcrypt.hashSync('tiadmin', bcrypt.genSaltSync(10), null), role: 'HR', createdAt: new Date(), updatedAt: new Date(), error_times: 0 },
      { name: 'user1', account: 'user1', password: bcrypt.hashSync('titaner', bcrypt.genSaltSync(10), null), role: 'employee', createdAt: new Date(), updatedAt: new Date(), error_times: 0 },
      { name: 'user2', account: 'user2', password: bcrypt.hashSync('titaner', bcrypt.genSaltSync(10), null), role: 'employee', createdAt: new Date(), updatedAt: new Date(), error_times: 0 },
      { name: 'user3', account: 'user3', password: bcrypt.hashSync('titaner', bcrypt.genSaltSync(10), null), role: 'employee', createdAt: new Date(), updatedAt: new Date(), error_times: 5 },
      { name: 'user4', account: 'user4', password: bcrypt.hashSync('titaner', bcrypt.genSaltSync(10), null), role: 'employee', createdAt: new Date(), updatedAt: new Date(), error_times: 5 }
    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
