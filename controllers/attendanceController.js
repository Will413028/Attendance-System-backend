const db = require('../models')
const Attendance = db.Attendance
const moment = require('moment')

const attendanceController = {
    postAttendance: async (req, res) => {
        let create_time;
        if(!req.body.create_time) {
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
            diff_hour = moment().diff(attendance_record.toJSON().clock_in_time, 'hour');

            if (diff_hour < 8) {
                status = "absent";
            }
            await attendance_record.update({
                clock_out_time: create_time,
                stats: status
            })

            return res.json({ status: 'success', message: 'clock_out successful'})
        } else {
            await Attendance.create({
                user_id: req.body.user_id,
                clock_in_time: create_time,
                attend_date: moment(create_time).format('YYYY-MM-DD'),
                stats: status
            })

            return res.json({ status: 'success', message: 'clock_in successful'})
        }
    }
}

module.exports = attendanceController