FROM gcr.io/distroless/nodejs22-debian12@sha256:b6faa039e930027831fd0db431f8713a91b569f055c59ccf6ea17e0e76798afe

WORKDIR /app

COPY package.json /app/
COPY next-logger.config.js /app/
COPY src/**/**/**/*.graphqls /app/
COPY .next/standalone /app/
COPY public /app/public/

EXPOSE 3000

ENV NODE_ENV=production

CMD ["server.js"]
