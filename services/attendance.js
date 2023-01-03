const db = require('../models');
const Attendance = db.Attendance;
const Holiday = db.Holiday;
const moment = require('moment');
const config = require('../config/config');

const attendanceServices = {
    getWorkday: () => {
        let workday;
        let is_after_midnight = moment().isAfter(moment().format('YYYY-MM-DD 00:00:00'));
        let is_before_workday_change = moment().isBefore(moment().format(`YYYY-MM-DD ${config.ATTENDANCE.TIME_POINT_OF_WORKDAY_CHANGING}`));

        if (is_after_midnight && is_before_workday_change) {
            workday = moment().add(-1, 'days').format('YYYY-MM-DD');
        } else {
            workday = moment().format('YYYY-MM-DD');
        }
        return workday;
    }
}

module.exports = attendanceServices;