const { Router } = require('express')

const router = Router()

const userController = require('../controllers/userController')
const { verifyToken } = require('../middlewares/auth')


router.post('/login', userController.login)

router.get('/users', verifyToken, userController.getUsers)



module.exports = router