FROM gcr.io/distroless/nodejs22-debian12@sha256:1c202268224281bd3a8ee94c7bcb4a2538ff9a07a03e5492b0695bbd2a2171f7

WORKDIR /app

COPY package.json /app/
COPY next-logger.config.js /app/
COPY src/**/**/**/*.graphqls /app/
COPY .next/standalone /app/
COPY public /app/public/

EXPOSE 3000

ENV NODE_ENV=production

CMD ["server.js"]
