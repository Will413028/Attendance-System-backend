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
            ABSENCE: "Absent",
            INCOMPLETE: "Incomplete",
            PRESENT: "Present",
            ON_LEAVE: "On_Leave",
            NAMES: ["Absent", "Incomplete", "Present", "On_Leave"]
        }
    },
    USER: {
        ROLES: {
            HR: "HR",
            EMPLOYEE: "employee"
        },
        MAXIMUM_FAILED_LOGIN_ATTEMPTS: 5
    }
}