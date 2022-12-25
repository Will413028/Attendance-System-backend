const db = require('../models')
const Attendance = db.Attendance
const moment = require('moment')

const attendanceController = {
    postAttendance: (req, res) => {
        let create_time;

        if(!req.body.create_time) {
            create_time = new Date();
        } else {
            create_time = req.body.create_time
        }

        let attendance_record = Attendance.findOne({ 
            where: { 
                user_id: req.body.user_id,
                attend_date: moment(new Date()).format('YYYY-MM-DD')
            }
        })

        if(attendance_record){
            Attendance.update({
                clock_out_time: create_time,
                stats: "present"
            },
            {
                where: 
                {
                    user_id: req.body.user_id,
                    attend_date: moment(new Date()).format('YYYY-MM-DD')
                }
            }).then(() => {
                return res.json({ status: 'success', message: 'clock_out successful'})
            })
        } else {
            Attendance.create({
                user_id: req.body.user_id,
                clock_in_time: create_time,
                attend_date: moment(create_time).format('YYYY-MM-DD'),
                stats: "present"
            })
            .then(() => {
                return res.json({ status: 'success', message: 'clock_in successful'})
            })
        }
    }
}

module.exports = attendanceController