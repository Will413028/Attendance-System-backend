require('dotenv').config()

module.exports = {
    use_env_variable: "CLEARDB_DATABASE_URL",
    JWT_SECRET: process.env.JWT_SECRET,
    production: {
        "use_env_variable": "CLEARDB_DATABASE_URL"
    },
    development: {
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_ROOT_PASSWORD,
        "database": process.env.DB_DATABASE,
        "host": process.env.DB_HOST,
        "port": process.env.DB_PORT,
        "dialect": "mysql"
    },
    HOLIDAY: {
        ENABLE: true,
        URL: 'https://data.ntpc.gov.tw/api/datasets/308DCD75-6434-45BC-A95F-584DA4FED251/json?page=1&size=1000'
    },
    ATTENDANCE: {
        WORKING_HOURS: 8,
        TIME_POINT_OF_WEEKDAY_CHANGING: "05:00:00",
        ENABLE_GPS_CHECK: true,
        MAXIMUM_METER_TO_CLOCK_IN: 400,
        STATUS: {
            ABSENCE: "Absent",
            INCOMPLETE: "Incomplete",
            PRESENT: "Present",
            ON_LEAVE: "On_Leave",
            LEAVE_EARLY: "Leave_Early",
            NAMES: ["Absent", "Incomplete", "Present", "On_Leave", "Leave_Early"]
        }
    },
    USER: {
        ROLES: {
            HR: "HR",
            EMPLOYEE: "employee"
        },
        MAXIMUM_FAILED_LOGIN_ATTEMPTS: 5
    },
    COMPANY: {
        NAME: "test_company",
        LATITUDE: process.env.LATITUDE,
        LONGITUDE: process.env.LONGITUDE
    }
}