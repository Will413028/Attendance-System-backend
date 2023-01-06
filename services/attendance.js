const db = require('../models');
const Attendance = db.Attendance;

async function findAll(opt = {}) {
    let attendances = await Attendance.findAll({
        where: opt,
        order: [["attend_date", "DESC"]]
    })

    return attendances;
}

module.exports = {
    findAll
}