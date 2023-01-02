const db = require('../models');
const Attendance = db.Attendance;
const Holiday = db.Holiday;
const moment = require('moment');
const config = require('../config/config');

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
            where_conditions["attend_date"] = status;
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
        let workday;
        let is_after_midnight = moment().isAfter(moment().format('YYYY-MM-DD 00:00:00'));
        let is_before_workday_change = moment().isBefore(moment().format(`YYYY-MM-DD ${config.ATTENDANCE.TIME_POINT_OF_WORKDAY_CHANGING}`));

        if (is_after_midnight && is_before_workday_change) {
            workday = moment().add(-1, 'days').format('YYYY-MM-DD');
        } else {
            workday = moment().format('YYYY-MM-DD');
        }

        let holiday = await Holiday.findOne({
            where: {
                date: workday
            }
        })

        if (holiday && holiday.is_holiday) {
            return res.status(400).json({ message: 'today is holiday' });
        }

        let create_time = moment().format('YYYY-MM-DD HH:mm:ss');

        let attendance_record = await Attendance.findOne({
            where: {
                user_id: req.body.user_id,
                attend_date: workday
            }
        })

        if (attendance_record) {
            let diff_hour = moment().diff(attendance_record.clock_in_time, 'hour');
            let status;

            if (diff_hour < config.ATTENDANCE.WORKING_HOURS) {
                status = "absence";
            } else {
                status = "present";
            }

            try {
                let attendance = await attendance_record.update({
                    clock_out_time: create_time,
                    status: status
                })

                attendance.dataValues.clock_in_time = moment(attendance.clock_in_time).format('YYYY-MM-DD HH:mm:ss');
                attendance.dataValues.clock_out_time = moment(attendance.clock_out_time).format('YYYY-MM-DD HH:mm:ss');

                if (attendance.status === "present") {
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
                    user_id: req.body.user_id,
                    clock_in_time: create_time,
                    attend_date: workday,
                    status: "pending"
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
        try {
            await Attendance.update({ ...req.body }, { where: { id: req.params.id } });
            return res.status(200).json({ message: 'update success' });
        } catch (err) {
            return res.status(400).json({ error: `update attendance failed: ${err}` });
        }
    }
}

module.exports = attendanceController;