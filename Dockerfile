FROM gcr.io/distroless/nodejs20-debian11@sha256:62a863da5f0d43bd3c7164450827fd7261ced193681e9e9217faa41c9b7cbded

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
