FROM gcr.io/distroless/nodejs20-debian11@sha256:4f2cf66225b06522d3b47266c2234ed47aa8ebd4bd3eef5e717c727fcb835d70

WORKDIR /app

COPY package.json /app/
COPY next-logger.config.js /app/
COPY src/**/**/**/*.graphqls /app/
COPY .next/standalone /app/
COPY public /app/public/

EXPOSE 3000

ENV NODE_ENV=production

CMD ["server.js"]
