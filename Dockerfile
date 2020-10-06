FROM node:lts-alpine

RUN mkdir -p /home/node/app/node_modules && mkdir -p /home/node/app/client/node_modules

WORKDIR /home/node/app

COPY package*.json ./
COPY client/package*.json ./client/

RUN chown -R node:node /home/node/app

USER node

RUN npm ci --only=production
RUN cd client && npm ci

COPY . .

RUN npm run client:build
