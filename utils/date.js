const moment = require('moment');
const config = require('../config/config');

function getWeekday(time_point_changing = config.ATTENDANCE.TIME_POINT_OF_WEEKDAY_CHANGING, time) {
    if (time) {
        time = moment(time);
    } else {
        time = moment();
    }

    let is_privously_weekday = time.isBefore(time.format(`YYYY-MM-DD ${time_point_changing}`));

    let weekday;
    if (is_privously_weekday) {
        weekday = time.add(-1, 'days').format('YYYY-MM-DD');
    } else {
        weekday = time.format('YYYY-MM-DD');
    }

    return weekday;
}

function dateFormat(date = moment()) {
    formatedDate = moment(date).format('YYYY-MM-DD HH:mm:ss')
    return formatedDate;
}

module.exports = {
    getWeekday,
    dateFormat
};