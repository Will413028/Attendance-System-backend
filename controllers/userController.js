const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User;
const Attendance = db.Attendance;

const userController = {
    login: async (req, res) => {
        const { account, password } = req.body;

        if (!account || !password) {
            return res.status(400).json({ message: "account & password are reauired" });
        }

        let user = await User.findOne({ where: { account } });

        if (!user) {
            return res.status(404).json({ message: "Account does not exist" });
        }

        if (user.error_times >= 5) {
            return res.status(400).json({ message: "This account has been locked because it has reached the maximum number of failed login attempts." });
        }

        if (!bcrypt.compareSync(password, user.password)) {
            if (user.error_times < 5) {
                await user.update({ error_times: user.error_times + 1 });
                return res.status(400).json({ message: "Password incorrect" });
            }
        }

        await user.update({ error_times: 0 });

        const payload = { id: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        return res.status(200).json({
            token: token,
            user: {
                id: user.id,
                account: user.account,
                name: user.name,
                role: user.role
            }
        })
    },

    updateUser: async (req, res) => {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null);

        await User.update({ password: password }, { where: { id: req.params.id } });
        return res.status(200).json({ message: "update user success" });
    },

    getUsers: async (req, res) => {
        let { user_id, attend_date, status } = req.query;

        let where_conditions = {};

        if (user_id) {
            where_conditions["user_id"] = user_id;
        }

        if (attend_date) {
            where_conditions["attend_date"] = attend_date;
        }

        if (status) {
            where_conditions["status"] = status;
        }

        const users = await User.findAll({
            include: {
                model: Attendance,
                where: where_conditions
            }
        })

        let res_data = {};

        if (users.length > 0) {
            res_data = {
                length: users.length,
                data: users
            }
        } else {
            return res.status(404).json({ message: "user not found" });
        }
        return res.status(200).json({ data: res_data, message: "get users successfully" });
    }
}

module.exports = userController