FROM gcr.io/distroless/nodejs20-debian11@sha256:917c4e6b60fd05d4e54b5e7165371a53a812bbcf244305fccddd2633eb20da39

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
