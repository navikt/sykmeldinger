FROM gcr.io/distroless/nodejs20-debian11@sha256:4a1503975e918095da0f588095741c5b354eb0fc4543294c76183e0efe261906

WORKDIR /app

COPY package.json /app/
COPY next-logger.config.js /app/
COPY src/**/**/**/*.graphqls /app/
COPY .next/standalone /app/
COPY public /app/public/

EXPOSE 3000

ENV NODE_ENV=production

CMD ["server.js"]
