const { Router } = require('express')

const router = Router()

const userController = require('../controllers/userController')
const attendanceController = require('../controllers/attendanceController')
const holidayController = require('../controllers/holidayController')
const { verifyToken, authIsAdmin } = require('../middlewares/auth')

router.post('/login', userController.login)

//user
router.get('/user', verifyToken, userController.getUsers)
router.put('/user/:id', verifyToken, userController.updateUser)

//attendance
router.get('/attendance', verifyToken, attendanceController.getAttendance)
router.post('/attendance', verifyToken, attendanceController.createAttendance)
router.get('/createAttendanceQRcode', attendanceController.createAttendance)
router.put('/attendance/:id', verifyToken, authIsAdmin, attendanceController.updateAttendance)

//holiday
router.post('/holiday', verifyToken, holidayController.updateHolidays)
router.get('/holiday', verifyToken, holidayController.getHoliday)

module.exports = router