const db = require('../models');
const Attendance = db.Attendance;
const Holiday = db.Holiday;
const moment = require('moment');
const config = require('../config/config');

async function isHoliday(date) {
    let isHoliday = await Holiday.findOne({
        where: {
            date: date
        }
    })
    if (isHoliday) {
        return true;
    } else {
        return false;
    }
}

async function getTodayClockInInformation(user_id, weekday) {

    let attendance_record = await Attendance.findOne({
        where: {
            user_id: user_id,
            attend_date: weekday
        }
    })

    if (attendance_record) {
        return attendance_record;
    }
}

async function findAll(opt = {}) {
    let attendances = await Attendance.findAll({
        where: opt,
        order: [["attend_date", "DESC"]]
    })

    return attendances;
}

async function getDistance(lat1, lon1, lat2, lon2) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        let radlat1 = Math.PI * lat1 / 180;
        let radlat2 = Math.PI * lat2 / 180;
        let theta = lon1 - lon2;
        let radtheta = Math.PI * theta / 180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 1609.344;
        return dist;
    }
}

async function isLeaveEarly(weekday) {
    let working_hours = moment().diff(weekday.clock_in_time, 'hour');

    if (working_hours < config.ATTENDANCE.WORKING_HOURS) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    findAll,
    getDistance,
    getTodayClockInInformation,
    isHoliday,
    isLeaveEarly
}