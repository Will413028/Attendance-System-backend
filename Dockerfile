FROM node:16.16.0

COPY package.json .

RUN npm install

WORKDIR /usr/src/app

EXPOSE 3000

COPY . .

CMD npm start