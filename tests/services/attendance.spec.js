const attendanceService = require('../../services/attendance');
const moment = require('moment');
const assert = require('assert');

describe('# attendance services', () => {
  let attendance_record = {
    clock_in_time: "2022-12-14 10:00:00",
    attend_date: "2022-12-14",
    status: "Incomplete"
  }
  context('check isLeaveEarly() if working hours equal to the minimum working hours', () => {

    it('The result should be false', async () => {
      let isLeaveEarly = await attendanceService.isLeaveEarly(attendance_record, 8, moment("2022-12-14 18:00:00"));

      assert.equal(isLeaveEarly, false);
    });
  })

  context('check isLeaveEarly() if working hours less than the minimum working hours', () => {

    it('The result should be true', async () => {
      let isLeaveEarly = await attendanceService.isLeaveEarly(attendance_record, 8, moment("2022-12-14 17:59:59"));

      assert.equal(isLeaveEarly, true);
    });
  })
})