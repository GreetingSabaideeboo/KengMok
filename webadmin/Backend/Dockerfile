FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./index.js ./

COPY . .

EXPOSE 6956

CMD [ "node", "index.js" ]