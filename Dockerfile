###############################################################################
###############################################################################
##                      _______ _____ ______ _____                           ##
##                     |__   __/ ____|  ____|  __ \                          ##
##                        | | | (___ | |__  | |  | |                         ##
##                        | |  \___ \|  __| | |  | |                         ##
##                        | |  ____) | |____| |__| |                         ##
##                        |_| |_____/|______|_____/                          ##
##                                                                           ##
## description     : Dockerfile for TsED Application                         ##
## author          : TsED team                                               ##
## date            : 2022-03-05                                              ##
## version         : 2.0                                                     ##
##                                                                           ##
###############################################################################
###############################################################################
ARG NODE_VERSION=16.13.1

FROM node:${NODE_VERSION}-alpine as build
WORKDIR /opt

COPY package.json package-lock.json tsconfig.json tsconfig.compile.json .barrelsby.json ./
COPY ./src ./src
COPY prisma ./prisma/

RUN npm install
RUN npx prisma generate
RUN npm run build

FROM node:${NODE_VERSION}-alpine as runtime
ENV WORKDIR /opt
WORKDIR $WORKDIR

RUN apk update && apk add build-base git curl
RUN npm install -g pm2
COPY --from=build /opt .

RUN yarn install --pure-lockfile --production

COPY ./views ./views
COPY processes.config.js .

EXPOSE 8081
ENV PORT 8081
ENV NODE_ENV production
ENV DATABASE_URL mongodb+srv://nxo_provider:XL8wpkJX7JuLc2Ja@cluster0.zbstje5.mongodb.net/nxoCare?retryWrites=true&w=majority

CMD ["pm2-runtime", "start", "processes.config.js", "--env", "production"]
