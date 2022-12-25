const db = require('../models')
const Attendance = db.Attendance

const attendanceController = {
    postAttendance: (req, res) => {
        let create_time;
        if(!req.body.create_time) {
            create_time = new Date();
        } else {
            create_time = req.body.create_time
        }
        return Attendance.create({
            user_id: req.body.user_id,
            clock_in_time: create_time,
        })
        .then(() => {
            res.json({ status: 'success', message: 'clock_in successful' })
        })
    }
}









module.exports = attendanceController