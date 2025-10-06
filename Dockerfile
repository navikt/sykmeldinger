FROM gcr.io/distroless/nodejs22-debian12@sha256:e4dfc93ed73008ab531d6b674bfe0e45f9c1c224914668685d998f873e00a8d2

WORKDIR /app

COPY package.json /app/
COPY next-logger.config.js /app/
COPY src/**/**/**/*.graphqls /app/
COPY .next/standalone /app/
COPY public /app/public/

EXPOSE 3000

ENV NODE_ENV=production

CMD ["server.js"]
