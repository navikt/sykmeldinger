FROM gcr.io/distroless/nodejs20-debian11@sha256:c31a1858869d1acd8d6ecb3bfb603ede95029941278337a921a01676e7d7ec38

WORKDIR /app

COPY package.json /app/
COPY next-logger.config.js /app/
COPY src/**/**/**/*.graphqls /app/
COPY .next/standalone /app/
COPY public /app/public/

EXPOSE 3000

ENV NODE_ENV=production

CMD ["server.js"]
