const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const db = require('../models')
const User = db.User

const userController = {

    login: (req, res) => {
        const { account, password } = req.body

        if (!account || !password) {
            return res.status(400).json({ message: "account & password are reauired" });
        }

        return User.findOne({
            where: { account }
        }).then(user => {
            if (!user) {
                return res.status(404).json({ message: "Account does not exist" });
            }
            if (!bcrypt.compareSync(password, user.password)) {
                return res.status(400).json({ message: "Password incorrect" });
            }

            const payload = { id: user.id }
            const token = jwt.sign(payload, process.env.JWT_SECRET)
            return res.status(200).json({
                status: 'success',
                message: 'login successful',
                token: token,
                user: { id: user.id, account: user.account, name: user.name, role: user.role }
            })
        })
    },

    updateUser: async (req, res) => {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await User.update({ password: req.body.password }, { where: { id: req.params.id } });
        return res.status(200).json({ message: "update user success" });
    },

    getUsers: (req, res) => {
        User.findAll().then(users => {
            users = users.map(user => ({
                ...user.dataValues
            }))
            return res.status(200).json(users);
        })
    }
}

module.exports = userController