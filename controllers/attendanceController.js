const db = require('../models');
const Attendance = db.Attendance;
const Holiday = db.Holiday;
const moment = require('moment');
const config = require('../config/config');
const Date = require('../utils/date');

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

        let attendances = await Attendance.findAll({
            where: where_conditions,
            order: [["attend_date", "DESC"]]
        })

        attendances.forEach(element => {
            element.dataValues.clock_in_time = moment(element.clock_in_time).format('YYYY-MM-DD HH:mm:ss');
            element.dataValues.clock_out_time = moment(element.clock_out_time).format('YYYY-MM-DD HH:mm:ss');
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
        let weekday = Date.getWeekday(config.ATTENDANCE.TIME_POINT_OF_WEEKDAY_CHANGING);

        if (config.HOLIDAY.ENABLE) {
            let isHoliday = await Holiday.findOne({
                where: {
                    date: weekday
                }
            })
            if (isHoliday) {
                return res.status(400).json({ message: 'today is holiday' });
            }
        }

        let create_time = moment().format('YYYY-MM-DD HH:mm:ss');

        let user_id;

        if (req.body.user_id) {
            user_id = req.body.user_id
        } else if (req.query.user_id) {
            user_id = req.query.user_id
        }

        if (!user_id) {
            return res.status(400).json({ message: 'user_id is required' });
        }

        let attendance_record = await Attendance.findOne({
            where: {
                user_id: user_id,
                attend_date: weekday
            }
        })

        if (attendance_record) {
            let diff_hour = moment().diff(attendance_record.clock_in_time, 'hour');
            let status;

            if (diff_hour < config.ATTENDANCE.WORKING_HOURS) {
                status = config.ATTENDANCE.STATUS.ABSENCE;
            } else {
                status = config.ATTENDANCE.STATUS.PRESENT;
            }

            try {
                let attendance = await attendance_record.update({
                    clock_out_time: create_time,
                    status: status
                })

                attendance.dataValues.clock_in_time = moment(attendance.clock_in_time).format('YYYY-MM-DD HH:mm:ss');
                attendance.dataValues.clock_out_time = moment(attendance.clock_out_time).format('YYYY-MM-DD HH:mm:ss');

                if (attendance.status === config.ATTENDANCE.STATUS.PRESENT) {
                    return res.status(200).json({ data: attendance, message: 'clock_out success' });
                } else {
                    return res.status(200).json({ data: attendance, message: 'less than working hours, status is absence' });
                }
            } catch (err) {
                return res.status(400).json({ error: `clock out failed: ${err}` });
            }
        } else {
            try {
                let attendance = await Attendance.create({
                    user_id: user_id,
                    clock_in_time: create_time,
                    attend_date: weekday,
                    status: config.ATTENDANCE.STATUS.PENDING
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