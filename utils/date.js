const moment = require('moment');
const config = require('../config/config');

const DateUtil = {
    getWeekday: (time, time_point_changing=config.ATTENDANCE.TIME_POINT_OF_WEEKDAY_CHANGING) => {
        if (!time) {
            time = moment();
        } else {
            time = moment(time);
        }

        let is_privously_weekday = time.isBefore(time.format(`YYYY-MM-DD ${time_point_changing}`));

        let weekday;
        if (is_privously_weekday) {
            weekday = time.add(-1, 'days').format('YYYY-MM-DD');
        } else {
            weekday = time.format('YYYY-MM-DD');
        }

        return weekday;
    },
    dateFormat: (date = moment()) => {
        formatedDate = moment(date).format('YYYY-MM-DD HH:mm:ss')
        return formatedDate;
    }
}

module.exports = DateUtil;