require('dotenv').config()

module.exports = {
    use_env_variable: "CLEARDB_DATABASE_URL",
    JWT_SECRET: process.env.JWT_SECRET,
    HOLIDAY: {
        ENABLE: true,
        URL: 'https://data.ntpc.gov.tw/api/datasets/308DCD75-6434-45BC-A95F-584DA4FED251/json?page=1&size=1000'
    },
    ATTENDANCE: {
        WORKING_HOURS: 8,
        TIME_POINT_OF_WEEKDAY_CHANGING: "05:00:00",
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