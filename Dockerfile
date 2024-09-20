FROM gcr.io/distroless/nodejs20-debian12@sha256:1cd5ddc2eaa4068efca88d84436e8edefea509512fe438c41bcd738a9d53002f

WORKDIR /app

COPY package.json /app/
COPY next-logger.config.js /app/
COPY src/**/**/**/*.graphqls /app/
COPY .next/standalone /app/
COPY public /app/public/

EXPOSE 3000

ENV NODE_ENV=production

CMD ["server.js"]
