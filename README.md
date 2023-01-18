# Attendance-System-backend

## Demo Link

https://attendance-system.onrender.com

## Features
- ### Database: using MySQL
- ### Authentication: using jsonwebtoken
- ### Testing: unit tests using Mocha
- ### Environment variables: using dotenv
- ### CI/CD: using GitHub Action and Heroku

## API Endpoints
List of available routes:

**Auth routes**:\
`POST /login` - login

**User routes**:\
`GET /users` - get all users\
`PUT /users/:id` - update user

**Attendance routes**:\
`GET /attendances` - get all attendance\
`POST /attendances` - create an attendance\
`PUT /attendances/:id` - update attendance\
`GET /attendanceQRcode` - get attendance QRcode

**Holiday routes**:\
`POST /holidays` - create holiday\
`GET /holidays` - get all holiday

## How to run:
    
1. Clone Project
    ```
    git clone https://github.com/Will413028/Attendance-System-backend.git
    ```
2. go to project folder
    ``` 
    cd Attendance-System-backend
    ```
    
3. setup Database with docker ( Prerequest : Docker) 
How to install Docker: [Mac](https://docs.docker.com/desktop/install/mac-install/) | [Windows](https://docs.docker.com/desktop/install/windows-install/) | [Linux](https://docs.docker.com/desktop/install/linux-install/))

    Option 1: MySQL
    ```
    sudo docker run --restart always --name mysql-attendance-system -e MYSQL_DATABASE=attendance-system -e MYSQL_ROOT_PASSWORD=12345678 -p 3306:3306 -d mysql:5.7
    ```
    Option 2: MariaDB
    Since mysql 5.7 does not support M1 Mac, you can use mariadb (Don't need to change setting)
    ```
    sudo docker run --restart always --name mysql-attendance-system -e MYSQL_DATABASE=attendance-system -e MYSQL_ROOT_PASSWORD=12345678 -p 3306:3306 -d mariadb
    ``` 
4. Install Dependencies
    ```
    npm install
    ```

5. Setup .env file
#### Important: LATITUDE & LONGITUDE MUST change to your location otherwise clock_in can not pass position check or You can disable the ENABLE_GPS_CHECK in config.js
#### Google map can find your latitude and longitude
    ```
    #.env example
    PORT=3000
    JWT_SECRET=JWT_SECRET
    DB_USERNAME=root
    DB_ROOT_PASSWORD=12345678
    DB_DATABASE=attendance-system
    DB_HOST=localhost
    DB_PORT=3306
    LATITUDE=
    LONGITUDE=
    ```
5. database migrate 
    ```
    npm run migrate
    ```
6.  Init seed data
    ```
    npm run seed
    ```     
7. Run project
    ``` 
    npm run start
    ```
## test account
    1. Admin user
        account: admin
        password: tiadmin
    2. Normal user
        account: user1
        password: titaner
        account: user2
        password: titaner
    3. Locked user
        account: user3
        password: titaner
        account: user4
        password: titaner

## Database Design
https://dbdiagram.io/d/639a979599cb1f3b55a1810b
