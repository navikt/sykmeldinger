FROM navikt/node-express:14

COPY server/dist/index.js .
COPY /build ./build

EXPOSE 8080

ENV PUBLIC_URL=/syk/sykmeldinger
ENV NODE_ENV=production

CMD ["node", "index.js"]
