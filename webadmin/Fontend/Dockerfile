# FROM node:latest

# WORKDIR /usr/src/app

# COPY package.json ./

# RUN npm install

# COPY . .

# EXPOSE 5002

# CMD ["npm","run","dev"]

FROM node:latest as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html