const { Router } = require('express')

const router = Router()

const userController = require('../controllers/userController')
const attendanceController = require('../controllers/attendanceController')
const holidayController = require('../controllers/holidayController')
const { verifyToken, authIsAdmin } = require('../middlewares/auth')

router.post('/login', userController.login)

//user
router.get('/users', verifyToken, userController.getUsers)
router.put('/users/:id', verifyToken, userController.updateUser)

//attendance
router.get('/attendances', verifyToken, attendanceController.getAttendance)
router.post('/attendances', verifyToken, attendanceController.createAttendance)
router.get('/attendanceQRcode', attendanceController.createAttendance)
router.put('/attendances/:id', verifyToken, authIsAdmin, attendanceController.updateAttendance)

//holiday
router.post('/holidays', verifyToken, holidayController.updateHolidays)
router.get('/holidays', verifyToken, holidayController.getHoliday)

module.exports = router