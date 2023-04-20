FROM gcr.io/distroless/nodejs:18 as runtime

ARG ENV

WORKDIR /app

COPY nais/envs/.env.$ENV /app/.env.production
COPY package.json /app/
COPY next-logger.config.js /app/
COPY src/**/**/**/*.graphqls /app/
COPY .next/standalone /app/
COPY public /app/public/

EXPOSE 3000

ENV NODE_ENV=production
ENV NODE_OPTIONS '-r next-logger'

CMD ["server.js"]
