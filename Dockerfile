FROM gcr.io/distroless/nodejs22-debian12@sha256:826bb2efc9f44adbf2cf77b49bcd9be01c3abe3c217cc75d5fc5ac8ee7de267a

WORKDIR /app

COPY package.json /app/
COPY next-logger.config.js /app/
COPY src/**/**/**/*.graphqls /app/
COPY .next/standalone /app/
COPY public /app/public/

EXPOSE 3000

ENV NODE_ENV=production

CMD ["server.js"]
