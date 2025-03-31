FROM gcr.io/distroless/nodejs22-debian12@sha256:dfc74b29486c7f75b32b7c97acf078cfce6665336fb2f08e0946ec77042b5fe3

WORKDIR /app

COPY package.json /app/
COPY next-logger.config.js /app/
COPY src/**/**/**/*.graphqls /app/
COPY .next/standalone /app/
COPY public /app/public/

EXPOSE 3000

ENV NODE_ENV=production

CMD ["server.js"]
