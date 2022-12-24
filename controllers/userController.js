const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const db = require('../models')
const User = db.User

const userController = {
  login: (req, res) => {
    const { account, password } = req.body
    if (!account || !password) {
      return res.json({ status: 'error', message: "account & password are reauired" })
    }

    return User.findOne({
      where: {account}
    }).then(user => {
      if (!user) {
        return res.json({ status: 'error', message: "Account does not exist" })
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return res.json({ status: 'error', message: "Password incorrect" })
      }

      const payload = { id: user.id }
      const token = jwt.sign(payload, process.env.JWT_SECRET)
      return res.json({
        status: 'success',
        message: 'login successful',
        token: token,
        user: { id: user.id, account: user.account, name: user.name, role: user.role }
      })
    })
  },

  getUsers: (req, res) => {
    User.findAll().then(users => {
        users = users.map(user => ({
        ...user.dataValues
      }))
      return res.json(users)
    })
  }
}



module.exports = userController