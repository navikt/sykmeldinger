FROM gcr.io/distroless/nodejs20-debian11@sha256:73c609013959f2a864fdd950a26fdac6138a608a246b8f61fe9485ce89b919e1

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
