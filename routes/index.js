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
router.get('/createAttendanceQRcode', verifyToken, attendanceController.createAttendance)
router.put('/attendance/:id', verifyToken, authIsAdmin, attendanceController.updateAttendance)

//holiday
router.put('/holiday', verifyToken, holidayController.updateHolidays)

module.exports = router