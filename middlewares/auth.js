const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;
require('dotenv').config()

verifyToken = (req, res, next) => {
  let token = req.headers["token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const auth = {
  verifyToken: verifyToken
};
module.exports = auth;