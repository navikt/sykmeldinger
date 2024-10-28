FROM gcr.io/distroless/nodejs20-debian12@sha256:d2913d45167ec0f3a6cbbf20ba17416891fb6fffc77ed883d772de555a6a1f2e

WORKDIR /app

COPY package.json /app/
COPY next-logger.config.js /app/
COPY src/**/**/**/*.graphqls /app/
COPY .next/standalone /app/
COPY public /app/public/

EXPOSE 3000

ENV NODE_ENV=production

CMD ["server.js"]
