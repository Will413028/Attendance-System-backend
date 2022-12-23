'use strict';
module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define('Attendance', {
    user_id: DataTypes.INTEGER,
    clock_in_time: DataTypes.DATE,
    clock_out_time: DataTypes.DATE,
    attend_date: DataTypes.DATEONLY,
    stats: DataTypes.STRING
  }, {});
  Attendance.associate = function (models) {
    Attendance.belongsTo(models.User)
  };
  return Attendance;
};