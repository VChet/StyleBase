FROM node:lts-alpine

RUN mkdir -p /app/node_modules && mkdir -p /app/client/node_modules

WORKDIR /app

COPY package*.json ./
COPY client/package*.json ./client/

COPY . .

RUN npm ci --only=production
RUN cd client && npm ci && npm run build
