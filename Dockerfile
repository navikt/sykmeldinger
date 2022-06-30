FROM node:16-alpine

RUN apk add --no-cache bash

ARG NPM_AUTH_TOKEN

WORKDIR /app

ENV NODE_ENV production

COPY package.json /app/
COPY .yarn /app/.yarn
COPY .yarnrc.yml /app/
COPY next-logger.config.js /app/
COPY next.config.js /app/
COPY sentry.client.config.js /app/
COPY sentry.server.config.js /app/
COPY yarn.lock /app/
COPY scripts /app/scripts
COPY src/**/**/**/*.graphqls /app/

RUN yarn --immutable

COPY .next /app/.next/
COPY public /app/public/

EXPOSE 3000

CMD ["yarn", "start:prod"]
