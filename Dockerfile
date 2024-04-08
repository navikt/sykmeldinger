FROM gcr.io/distroless/nodejs20-debian11@sha256:17c2af9754bee2fa08f2012cca8686e7fa92c45cbbf7fe9bc23c277eca7ed91d

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
