const { Router } = require('express')

const router = Router()

const userController = require('../controllers/userController')
const attendanceController = require('../controllers/attendanceController')
const holidayController = require('../controllers/holidayController')
const { verifyToken } = require('../middlewares/auth')

router.post('/login', userController.login)

//user
router.get('/user', verifyToken, userController.getUsers)

//attendance
router.post('/attendance', verifyToken, attendanceController.createAttendance)
router.put('/attendance/:id', verifyToken, attendanceController.updateAttendance)

//holiday
router.put('/holiday', verifyToken, holidayController.updateHolidays)

module.exports = router