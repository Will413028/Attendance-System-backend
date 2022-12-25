'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Users',
      'error_times',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    )
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn('Users', 'error_times')
  }
};
