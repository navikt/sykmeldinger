FROM gcr.io/distroless/nodejs22-debian12@sha256:ba670ace564d2ff780881509904d3ee4c8fbf3e587bed6a395377b7e56bfcf4a

WORKDIR /app

COPY package.json /app/
COPY next-logger.config.js /app/
COPY src/**/**/**/*.graphqls /app/
COPY .next/standalone /app/
COPY public /app/public/

EXPOSE 3000

ENV NODE_ENV=production

CMD ["server.js"]
