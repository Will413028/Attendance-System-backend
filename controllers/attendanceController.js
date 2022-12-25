const db = require('../models')
const Attendance = db.Attendance
const moment = require('moment')

const attendanceController = {
    createAttendance: async (req, res) => {

        let is_holiday = await db.Holiday.findOne({
            where: {
                date: moment(new Date()).format('YYYY-MM-DD')
            }
        })

        if (is_holiday.is_holiday) {
            return res.status(400).json({ message: 'today is holiday' });
        }

        let create_time;
        if (!req.body.create_time) {
            create_time = new Date();
        } else {
            create_time = req.body.create_time
        }

        let attendance_record = await Attendance.findOne({
            where: {
                user_id: req.body.user_id,
                attend_date: moment(new Date()).format('YYYY-MM-DD')
            }
        })

        let status = "present";

        if (attendance_record) {
            let diff_hour = moment().diff(attendance_record.toJSON().clock_in_time, 'hour');

            if (diff_hour < 8) {
                status = "absent";
            }
            await attendance_record.update({
                clock_out_time: create_time,
                status: status
            })
            return res.status(200).json({ message: 'clock_out success' });
        } else {
            await Attendance.create({
                user_id: req.body.user_id,
                clock_in_time: create_time,
                attend_date: moment(create_time).format('YYYY-MM-DD'),
                status: status
            })
            return res.status(200).json({ message: 'clock_in success' });
        }
    },

    updateAttendance: async (req, res) => {
        const attendance = await Attendance.findByPk(req.params.id);

        if (!attendance) {
            return res.status(404).json({ message: "Attendance not found" });
        }
        await Attendance.update({ ...req.body }, { where: { id: req.params.id } })
        return res.status(200).json({ message: 'update success' });
    }
}

module.exports = attendanceController