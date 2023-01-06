const moment = require('moment');
const config = require('../config/config');

const DateUtil = {
    getWeekday: () => {
        let weekday = moment();
        let is_privously_weekday = weekday.isBefore(moment().format(`YYYY-MM-DD ${config.ATTENDANCE.TIME_POINT_OF_WEEKDAY_CHANGING}`));

        if (is_privously_weekday) {
            weekday = moment().add(-1, 'days').format('YYYY-MM-DD');
        }

        return weekday;
    },
    dateFormat: (date = moment()) => {
        formatedDate = moment(date).format('YYYY-MM-DD HH:mm:ss')
        return formatedDate;
    }
}

module.exports = DateUtil;