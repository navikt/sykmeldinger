FROM gcr.io/distroless/nodejs18-debian11@sha256:2b5a7f28895b399a6d16b057a8ca5d72a5add897425ecab66b5202d821c0b641

WORKDIR /app

COPY package.json /app/
COPY next-logger.config.js /app/
COPY src/**/**/**/*.graphqls /app/
COPY .next/standalone /app/
COPY public /app/public/

EXPOSE 3000

ENV NODE_ENV=production
ENV NODE_OPTIONS '-r next-logger'

CMD ["server.js"]
