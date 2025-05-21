FROM gcr.io/distroless/nodejs22-debian12@sha256:484f0e74e8755d32470066237393325f34e64156f4616abbe480e61c2ebfc30f

WORKDIR /app

COPY package.json /app/
COPY next-logger.config.js /app/
COPY src/**/**/**/*.graphqls /app/
COPY .next/standalone /app/
COPY public /app/public/

EXPOSE 3000

ENV NODE_ENV=production

CMD ["server.js"]
