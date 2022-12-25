const { Router } = require('express')

const router = Router()

const userController = require('../controllers/userController')
const attendanceController = require('../controllers/attendanceController')
const { verifyToken } = require('../middlewares/auth')

router.post('/login', userController.login)

//user
router.get('/user', verifyToken, userController.getUsers)

//attendance
router.post('/attendance', verifyToken, attendanceController.postAttendance)

module.exports = router