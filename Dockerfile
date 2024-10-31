FROM gcr.io/distroless/nodejs22-debian12@sha256:a92d1936071dbf14eed4ef683f555eb84bae00e2c43b2b7706313b613cc6fea9

WORKDIR /app

COPY package.json /app/
COPY next-logger.config.js /app/
COPY src/**/**/**/*.graphqls /app/
COPY .next/standalone /app/
COPY public /app/public/

EXPOSE 3000

ENV NODE_ENV=production

CMD ["server.js"]
