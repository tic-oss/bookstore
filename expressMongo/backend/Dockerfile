FROM node:slim as storebackend

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .      

EXPOSE 3000

CMD node index.js
