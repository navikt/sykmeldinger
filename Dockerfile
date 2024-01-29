FROM gcr.io/distroless/nodejs20-debian11@sha256:35ba72f92135cfd254fbbb7fafc0117b5b5c40b98b4e26087736e85aaf7bcf7f

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
