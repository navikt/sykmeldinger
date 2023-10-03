FROM gcr.io/distroless/nodejs18-debian11@sha256:15b6984f0dacd1942bf800b0142997ccaf40da8a0dddb8c0e4286af6a318f9c6

WORKDIR /app

COPY package.json /app/
COPY next-logger.config.js /app/
COPY src/**/**/**/*.graphqls /app/
COPY .next/standalone /app/
COPY public /app/public/

COPY .next/static ./.next/static

EXPOSE 3000

ENV NODE_ENV=production
ENV NODE_OPTIONS '-r next-logger'

CMD ["server.js"]
