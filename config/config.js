require('dotenv').config()

module.exports = {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    username: process.env.DB_USERNAME,
    password: process.env.DB_ROOT_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    HOLIDAY: {
        ENABLE: true,
        URL: 'https://data.ntpc.gov.tw/api/datasets/308DCD75-6434-45BC-A95F-584DA4FED251/json?page=1&size=1000'
    },
    ATTENDANCE: {
        WORKING_HOURS: 8,
        TIME_POINT_OF_WORKDAY_CHANGING: "05:00:00",
        STATUS: {
            ABSENCE: "absence",
            PENDING: "pending",
            PRESENT: "present",
            NAMES:["absence", "pending", "present"]
        }
    },
    ROLES: {
        HR: "HR",
        EMPLOYEE: "employee"
    }
}