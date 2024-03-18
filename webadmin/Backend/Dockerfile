# FROM node:latest

# WORKDIR /usr/src/app

# COPY package.json ./

# RUN npm install

# COPY . .

# EXPOSE 5001

# CMD ["nodemon","index.js"]

FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5001

CMD [ "node", "index.js" ]