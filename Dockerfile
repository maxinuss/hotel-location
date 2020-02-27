FROM node:12

WORKDIR /hotel-location
COPY package*.json ./

RUN npm install -g nodemon --quiet
RUN npm install --quiet