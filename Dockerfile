FROM gcr.io/distroless/nodejs22-debian12@sha256:c82186149af63a66f02ec03e408b1e391a3e1e20d3e7d4ac926366de592f2161

WORKDIR /app

COPY package.json /app/
COPY next-logger.config.js /app/
COPY src/**/**/**/*.graphqls /app/
COPY .next/standalone /app/
COPY public /app/public/

EXPOSE 3000

ENV NODE_ENV=production

CMD ["server.js"]
