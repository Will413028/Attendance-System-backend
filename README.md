# Attendance-System-backend


## How to run:
    
1. Clone Project
    ```
    git clone https://github.com/Will413028/Attendance-System-backend.git
    ```
2. go to project folder
    ``` 
    cd Attendance-System-backend
    ```
    
3. setup MySQL with docker ( Prerequest :docker )
 
    ```
    sudo docker run --restart always --name mysql-attendance-system -e MYSQL_DATABASE=attendance-system -e MYSQL_ROOT_PASSWORD=12345678 -p 3306:3306 -d mysql:5.7
    ```
4. Install Dependencies
    ```
    npm install
    ```

5. Setup .env file
    
    ```
    #.env example
    PORT=
    JWT_SECRET=
    DB_USERNAME=
    DB_ROOT_PASSWORD=
    DB_PASSWORD=
    DB_DATABASE=
    DB_HOST=
    DB_PORT=
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
    1. normal user
        account: user1
        password: titaner
    2. admin user
        account: admin
        password: tiadmin

## How to run on Debug mode:
    
    npm run dev

## Database Design
https://dbdiagram.io/d/639a979599cb1f3b55a1810b
