FROM gcr.io/distroless/nodejs22-debian12@sha256:5e3a06cb2063751099732f72f79c9b0385d48c50005846a3b98b12c9fdc0a05c

WORKDIR /app

COPY package.json /app/
COPY next-logger.config.js /app/
COPY src/**/**/**/*.graphqls /app/
COPY .next/standalone /app/
COPY public /app/public/

EXPOSE 3000

ENV NODE_ENV=production

CMD ["server.js"]
