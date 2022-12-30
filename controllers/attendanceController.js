const db = require('../models');
const Attendance = db.Attendance;
const Holiday = db.Holiday;
const moment = require('moment');
const config = require('../config/config');

const attendanceController = {
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
                if (attendance.status === "present") {
                    return res.status(200).json({ message: 'clock_out success' });
                } else {
                    return res.status(200).json({ message: 'less than working hours, status is absence' });
                }
            } catch (err) {
                return res.status(400).json({ error: `clock out failed: ${err}` });
            }
        } else {
            try {
                await Attendance.create({
                    user_id: req.body.user_id,
                    clock_in_time: create_time,
                    attend_date: workday,
                    status: "pending"
                })
            } catch (err) {
                return res.status(400).json({ error: `clock in failed: ${err}` });
            }
            return res.status(200).json({ message: 'clock_in success' });
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