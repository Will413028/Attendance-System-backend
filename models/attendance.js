'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Attendance.init({
    id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    clock_in_time: DataTypes.DATE,
    clock_out_time: DataTypes.DATE,
    attend_date: DataTypes.DATEONLY,
    stats: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Attendance',
  });
  return Attendance;
};