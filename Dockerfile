FROM gcr.io/distroless/nodejs22-debian12@sha256:20faf7f34237c2546646225ec439c7241351475583d7ef030997983e527ac73a

WORKDIR /app

COPY package.json /app/
COPY next-logger.config.js /app/
COPY src/**/**/**/*.graphqls /app/
COPY .next/standalone /app/
COPY public /app/public/

EXPOSE 3000

ENV NODE_ENV=production

CMD ["server.js"]
