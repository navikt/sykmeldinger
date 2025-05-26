FROM gcr.io/distroless/nodejs22-debian12@sha256:7461aeaace21b36e65d1b56bf3eda84cd5d156d344ecf95702bf76e03d40d4ab

WORKDIR /app

COPY package.json /app/
COPY next-logger.config.js /app/
COPY src/**/**/**/*.graphqls /app/
COPY .next/standalone /app/
COPY public /app/public/

EXPOSE 3000

ENV NODE_ENV=production

CMD ["server.js"]
