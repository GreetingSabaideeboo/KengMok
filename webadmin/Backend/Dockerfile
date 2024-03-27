FROM node:latest

ENV SERVER_IP=192.168.15.227 

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./index.js ./

COPY . .

EXPOSE 6956

CMD [ "node", "index.js" ]