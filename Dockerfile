###--- STAGE 1 - Build ---###
FROM node:12-alpine as BUILD
WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY . .
RUN npm run build:prod

###--- STAGE 2 - Production ---###
FROM node:12-alpine as PROD
ENV NODE_ENV=prod
WORKDIR /usr/src/app
COPY --from=BUILD /usr/src/app/node_modules ./node_modules
COPY --from=BUILD /usr/src/app/package*.json ./
COPY --from=BUILD /usr/src/app/dist ./dist
COPY src/certs ./usr/src/app/dist/src/certs
ENTRYPOINT ["node", "/usr/src/app/dist/src/server.js"]

