FROM gcr.io/distroless/nodejs20-debian11@sha256:6d230113fa2945518dffd8d7049a0c2378a4aa6b4096f5d569c6277c6081ce39

WORKDIR /app

COPY package.json /app/
COPY next-logger.config.js /app/
COPY src/**/**/**/*.graphqls /app/
COPY .next/standalone /app/
COPY public /app/public/

EXPOSE 3000

ENV NODE_ENV=production
ENV NODE_OPTIONS '-r next-logger'

CMD ["server.js"]
