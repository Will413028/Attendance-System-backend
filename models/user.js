'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    account: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    error_times: DataTypes.INTEGER
  }, {});
  User.associate = function (models) {
    User.hasMany(models.Attendance, {
      foreignKey: "user_id"
    })
  };
  return User;
};