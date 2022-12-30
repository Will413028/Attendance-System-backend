const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;
const config = require('../config/config');
require('dotenv').config()

verifyToken = async (req, res, next) => {
  let token = req.headers["token"];

  if (!token) {
    return res.status(401).json({
      message: "No token provided!"
    });
  }

  await jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Unauthorized!"
      });
    }
    next();
  });
};

authIsAdmin = async (req, res, next) => {
  let token = req.headers["token"];

  if (!token) {
    return res.status(401).json({
      message: "No token provided!"
    });
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  const currentUser = await User.findByPk(decoded.id);

  if (currentUser && currentUser.role !== config.ROLES.HR) {
    return res.status(403).json({
      status: 'error',
      message: 'user does not have permission'
    })
  }
  next();
};

module.exports = {
  verifyToken: verifyToken,
  authIsAdmin: authIsAdmin
};