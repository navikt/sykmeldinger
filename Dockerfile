FROM gcr.io/distroless/nodejs20-debian12@sha256:0f5e6997a042dc3715dfae2a1197ef23f92d557b162a3a53cf3d3f469839eb64

WORKDIR /app

COPY package.json /app/
COPY next-logger.config.js /app/
COPY src/**/**/**/*.graphqls /app/
COPY .next/standalone /app/
COPY public /app/public/

EXPOSE 3000

ENV NODE_ENV=production

CMD ["server.js"]
