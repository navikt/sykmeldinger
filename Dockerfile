FROM gcr.io/distroless/nodejs22-debian12@sha256:23637ce9bd386f5883df054ed415a8240bac1df6fd3aa500686cc3a86e0b60e1

WORKDIR /app

COPY package.json /app/
COPY next-logger.config.js /app/
COPY src/**/**/**/*.graphqls /app/
COPY .next/standalone /app/
COPY public /app/public/

EXPOSE 3000

ENV NODE_ENV=production

CMD ["server.js"]
