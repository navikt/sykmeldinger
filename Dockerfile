FROM gcr.io/distroless/nodejs22-debian12@sha256:f57f7f6815930ea535ba428ab49eb20421fe2495c661b7485c32f73180657f7c

WORKDIR /app

COPY package.json /app/
COPY next-logger.config.js /app/
COPY src/**/**/**/*.graphqls /app/
COPY .next/standalone /app/
COPY public /app/public/

EXPOSE 3000

ENV NODE_ENV=production

CMD ["server.js"]
