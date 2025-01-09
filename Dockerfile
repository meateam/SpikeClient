###--- STAGE 1 - Build ---###
FROM node:12-alpine as BUILD
WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig.json ./
COPY .env ./
RUN cat ./.env | grep NPM_TOKEN | cut -d '=' -f 2- > /tmp/NPM_TOKEN && \
    export NPM_TOKEN=$(cat /tmp/NPM_TOKEN) && \
    rm /tmp/NPM_TOKEN
RUN echo @yesodot:registry=https://gitlab.com/api/v4/projects/29372887/packages/npm/>> .npmrc
RUN echo //gitlab.com/api/v4/projects/29372887/packages/npm/:_authToken=$(echo $NPM_TOKEN) >> .npmrc
RUN cat .npmrc
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

