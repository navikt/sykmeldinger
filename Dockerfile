FROM gcr.io/distroless/nodejs20-debian11@sha256:e3dace3d556c83c3b194174425e52e947a2258f4661eaf450cb55859bf8cc9e9

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
