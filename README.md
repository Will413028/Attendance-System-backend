# Attendance-System-backend

## Prerequest :
docker & docker-compose

---
## How to run:
    
    1. git clone https://github.com/Will413028/Attendance-System-backend.git

    2. cd Attendance-System-backend

    3. sudo docker-compose up -d

    database migrate & seed
        Prerequest : sequelize &sequelize-cli
    4. npx sequelize db:migrate

    5. npx sequelize db:seed:all

## test account
    1. normal user
        account: user1
        password: titaner
    2. adimn user
        account: admin
        password: tiadmin

## How to run on Debug mode:

    npm install
    npm run dev
## .env example
    PORT=
    JWT_SECRET=
    DB_USERNAME=
    DB_ROOT_PASSWORD=
    DB_PASSWORD=
    DB_DATABASE=
    DB_HOST=
    DB_PORT=

How to setup MySQL without docker-compose:

    docker run --restrt always --name mysql-attendance-system -e MYSQL_DATABASE=attendance-system -e MYSQL_ROOT_PASSWORD=12345678 -p 3306:3306 -d mysql:5.7

