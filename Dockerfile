FROM gcr.io/distroless/nodejs20-debian11@sha256:4962d8544a98ee0d1cd07206c874c3c932e1b1dc90f096fc496c9bb5bf0bdddc

WORKDIR /app

COPY package.json /app/
COPY next-logger.config.js /app/
COPY src/**/**/**/*.graphqls /app/
COPY .next/standalone /app/
COPY public /app/public/

EXPOSE 3000

ENV NODE_ENV=production

CMD ["server.js"]
