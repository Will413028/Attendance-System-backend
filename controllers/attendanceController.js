const db = require('../models');
const Attendance = db.Attendance;
const moment = require('moment');
const config = require('../config/config');
const DateUtil = require('../utils/date');
const attendanceService = require('../services/attendance');
const jwt = require("jsonwebtoken");
require('dotenv').config();

const attendanceController = {
    getAttendance: async (req, res) => {
        let { user_id, attend_date, status } = req.query;
        let where_conditions = {};

        if (user_id) {
            where_conditions["user_id"] = user_id;
        }

        if (attend_date) {
            where_conditions["attend_date"] = attend_date;
        }

        if (status) {
            where_conditions["status"] = status;
        }

        let attendances = await attendanceService.findAll(where_conditions);


        attendances.forEach(element => {
            element.dataValues.clock_in_time = DateUtil.dateFormat(element.dataValues.clock_in_time);
            element.dataValues.clock_out_time = DateUtil.dateFormat(element.dataValues.clock_out_time);
        });

        let res_data = {};

        if (attendances.length > 0) {
            res_data = {
                length: attendances.length,
                data: attendances
            }
        } else {
            return res.status(404).json({ message: "attendances not found" });
        }
        return res.status(200).json({ data: res_data, message: "get attendances successfully" });
    },

    createAttendance: async (req, res) => {
        let current_time = moment().format('YYYY-MM-DD HH:mm:ss');
        let latitude, longitude, user_id, QRcodeTime;

        if (req.query.timestamp) {
            user_id = req.query.user_id;

            latitude = req.query.latitude
            longitude = req.query.longitude
            let token = req.query.token
            if (!token) {
                return res.status(401).json({
                    message: "No token provided!"
                });
            }

            jwt.verify(token, process.env.JWT_SECRET, (err) => {
                if (err) {
                    return res.status(401).json({
                        message: "Unauthorized!"
                    });
                }
            });
            let timestamp = req.query.timestamp
            QRcodeTime = moment(timestamp).format("YYYY-MM-DD HH:mm:ss")
        } else {
            user_id = req.body.user_id;
            latitude = req.body.latitude
            longitude = req.body.longitude
        }

        if (!user_id) {
            return res.status(400).json({ message: 'user_id is required' });
        }

        if (config.ATTENDANCE.ENABLE_GPS_CHECK) {

            if (!latitude || !longitude) {
                return res.status(400).json({ message: 'current position is required' });
            }
            let current_distance_to_company = await attendanceService.getDistance(latitude, longitude, config.COMPANY.LATITUDE, config.COMPANY.LONGITUDE);

            if (current_distance_to_company > config.ATTENDANCE.MAXIMUM_METER_TO_CLOCK_IN) {
                return res.status(400).json({ message: 'Too far from the company' });
            }
        }

        let time_point_changing = config.ATTENDANCE.TIME_POINT_OF_WEEKDAY_CHANGING
        let weekday;

        if (QRcodeTime) {
            weekday = await DateUtil.getWeekday(time_point_changing, QRcodeTime);
            if (weekday !== DateUtil.getWeekday(time_point_changing)) {
                return res.status(400).json({ message: 'QRcode is invaild' });
            }
        } else {
            weekday = await DateUtil.getWeekday(time_point_changing);
        }

        if (config.HOLIDAY.ENABLE) {
            let weekdayIsHoliday = await attendanceService.isHoliday(weekday);
            if (weekdayIsHoliday) {
                return res.status(400).json({ message: 'today is holiday' });
            }
        }

        let today_attendance_record = await attendanceService.getTodayClockInInformation(user_id, weekday);

        if (today_attendance_record) {

            let isTodayLeaveEarly = await attendanceService.isLeaveEarly(today_attendance_record, config.ATTENDANCE.WORKING_HOURS);

            let attendance_status;

            if (isTodayLeaveEarly) {
                attendance_status = config.ATTENDANCE.STATUS.ABSENCE;
            } else {
                attendance_status = config.ATTENDANCE.STATUS.PRESENT;
            }

            try {
                let attendance = await today_attendance_record.update({
                    clock_out_time: current_time,
                    status: attendance_status
                })

                attendance.dataValues.clock_in_time = moment(attendance.clock_in_time).format('YYYY-MM-DD HH:mm:ss');
                attendance.dataValues.clock_out_time = moment(attendance.clock_out_time).format('YYYY-MM-DD HH:mm:ss');

                if (isTodayLeaveEarly) {
                    return res.status(200).json({ data: attendance, message: 'less than working hours, status is absence' });
                } else {
                    return res.status(200).json({ data: attendance, message: 'clock_out success' });
                }
            } catch (err) {
                return res.status(400).json({ error: `clock out failed: ${err}` });
            }
        } else {
            try {
                let attendance = await Attendance.create({
                    user_id: user_id,
                    clock_in_time: current_time,
                    attend_date: weekday,
                    status: config.ATTENDANCE.STATUS.INCOMPLETE
                })

                attendance.dataValues.clock_in_time = moment(attendance.clock_in_time).format('YYYY-MM-DD HH:mm:ss');
                attendance.dataValues.clock_out_time = moment(attendance.clock_out_time).format('YYYY-MM-DD HH:mm:ss');

                return res.status(200).json({ data: attendance, message: 'clock_in success' });
            } catch (err) {
                return res.status(400).json({ error: `clock in failed: ${err}` });
            }
        }
    },

    updateAttendance: async (req, res) => {
        const attendance = await Attendance.findByPk(req.params.id);

        if (!attendance) {
            return res.status(404).json({ message: "Attendance not found" });
        }

        let status = req.body.status;

        if (!(config.ATTENDANCE.STATUS.NAMES.includes(status))) {
            return res.status(400).json({ message: "invaild status" });
        }

        try {
            await Attendance.update({ status: status }, { where: { id: req.params.id } });
            return res.status(200).json({ message: 'update success' });
        } catch (err) {
            return res.status(400).json({ error: `update attendance failed: ${err}` });
        }
    }
}

module.exports = attendanceController;