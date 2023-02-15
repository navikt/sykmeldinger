FROM node:18-alpine as build

RUN apk add --no-cache bash

ARG NPM_AUTH_TOKEN

WORKDIR /app

ENV NODE_ENV production

COPY package.json /app/
COPY .yarn /app/.yarn
COPY .yarnrc.yml /app/
COPY yarn.lock /app/
COPY scripts /app/scripts

RUN yarn workspaces focus -A --production

FROM gcr.io/distroless/nodejs:18 as runtime

WORKDIR /app

COPY --from=build /app/package.json /app/
COPY --from=build /app/node_modules /app/node_modules
COPY next.config.js /app/
COPY next-logger.config.js /app/
COPY src/**/**/**/*.graphqls /app/
COPY .next /app/.next/
COPY public /app/public/

EXPOSE 3000

ENV NODE_OPTIONS '-r next-logger'

CMD ["node_modules/next/dist/bin/next", "start"]
