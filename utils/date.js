const moment = require('moment');

const date = {
    getWeekday: (time_point_of_weekday_changing) => {
        let workday;
        let is_after_midnight = moment().isAfter(moment().format('YYYY-MM-DD 00:00:00'));
        let is_before_workday_change = moment().isBefore(moment().format(`YYYY-MM-DD ${time_point_of_weekday_changing}`));

        if (is_after_midnight && is_before_workday_change) {
            workday = moment().add(-1, 'days').format('YYYY-MM-DD');
        } else {
            workday = moment().format('YYYY-MM-DD');
        }
        return workday;
    }
}

module.exports = date;