'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Attendances', [
      { clock_in_time: '2022-12-30 08:00:00', clock_out_time: '2022-12-30 18:00:00', attend_date: "2022-12-30", status: 'Present', createdAt: new Date(), updatedAt: new Date(), user_id: 1 },
      { clock_in_time: '2022-12-31 08:00:00', clock_out_time: '2022-12-31 18:00:00', attend_date: "2022-12-31", status: 'Present', createdAt: new Date(), updatedAt: new Date(), user_id: 1 },
      { clock_in_time: '2022-01-04 08:00:00', clock_out_time: '2022-01-04 18:00:00', attend_date: "2022-01-04", status: 'Present', createdAt: new Date(), updatedAt: new Date(), user_id: 1 },
      { clock_in_time: '2022-01-05 08:00:00', clock_out_time: '2022-01-05 18:00:00', attend_date: "2022-01-05", status: 'Present', createdAt: new Date(), updatedAt: new Date(), user_id: 1 },
      { clock_in_time: '2022-01-06 09:00:00', clock_out_time: '2022-01-06 18:00:00', attend_date: "2022-01-06", status: 'Present', createdAt: new Date(), updatedAt: new Date(), user_id: 1 },
      { clock_in_time: '2022-01-07 12:00:00', clock_out_time: '2022-01-07 18:00:00', attend_date: "2022-01-07", status: 'Absent', createdAt: new Date(), updatedAt: new Date(), user_id: 1 },
      { clock_in_time: '2022-01-08 12:00:00', clock_out_time: null, attend_date: "2022-01-08", status: 'Incomplete', createdAt: new Date(), updatedAt: new Date(), user_id: 1 },
      { clock_in_time: '2022-12-30 08:00:00', clock_out_time: '2022-12-30 18:00:00', attend_date: "2022-12-30", status: 'Present', createdAt: new Date(), updatedAt: new Date(), user_id: 2 },
      { clock_in_time: '2022-12-31 08:00:00', clock_out_time: '2022-12-31 18:00:00', attend_date: "2022-12-31", status: 'Present', createdAt: new Date(), updatedAt: new Date(), user_id: 2 },
      { clock_in_time: '2022-01-04 08:00:00', clock_out_time: '2022-01-04 18:00:00', attend_date: "2022-01-04", status: 'Present', createdAt: new Date(), updatedAt: new Date(), user_id: 2 },
      { clock_in_time: '2022-01-05 08:00:00', clock_out_time: '2022-01-05 18:00:00', attend_date: "2022-01-05", status: 'Present', createdAt: new Date(), updatedAt: new Date(), user_id: 2 },
      { clock_in_time: '2022-01-06 09:00:00', clock_out_time: '2022-01-06 18:00:00', attend_date: "2022-01-06", status: 'Present', createdAt: new Date(), updatedAt: new Date(), user_id: 2 },
      { clock_in_time: '2022-01-07 12:00:00', clock_out_time: '2022-01-07 18:00:00', attend_date: "2022-01-07", status: 'Absent', createdAt: new Date(), updatedAt: new Date(), user_id: 2 },
      { clock_in_time: '2022-01-08 12:00:00', clock_out_time: null, attend_date: "2022-01-08", status: 'Incomplete', createdAt: new Date(), updatedAt: new Date(), user_id: 2 },
      { clock_in_time: '2022-12-30 08:00:00', clock_out_time: '2022-12-30 18:00:00', attend_date: "2022-12-30", status: 'Present', createdAt: new Date(), updatedAt: new Date(), user_id: 3 },
      { clock_in_time: '2022-12-31 08:00:00', clock_out_time: '2022-12-31 18:00:00', attend_date: "2022-12-31", status: 'Present', createdAt: new Date(), updatedAt: new Date(), user_id: 3 },
      { clock_in_time: '2022-01-04 08:00:00', clock_out_time: '2022-01-04 18:00:00', attend_date: "2022-01-04", status: 'Present', createdAt: new Date(), updatedAt: new Date(), user_id: 3 },
      { clock_in_time: '2022-01-05 08:00:00', clock_out_time: '2022-01-05 18:00:00', attend_date: "2022-01-05", status: 'Present', createdAt: new Date(), updatedAt: new Date(), user_id: 3 },
      { clock_in_time: '2022-01-06 09:00:00', clock_out_time: '2022-01-06 18:00:00', attend_date: "2022-01-06", status: 'Present', createdAt: new Date(), updatedAt: new Date(), user_id: 3 },
      { clock_in_time: '2022-01-07 12:00:00', clock_out_time: '2022-01-07 18:00:00', attend_date: "2022-01-07", status: 'Absent', createdAt: new Date(), updatedAt: new Date(), user_id: 3 },
      { clock_in_time: '2022-01-08 12:00:00', clock_out_time: null, attend_date: "2022-01-08", status: 'Incomplete', createdAt: new Date(), updatedAt: new Date(), user_id: 3 },
    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Attendances', null, {});
  }
};
