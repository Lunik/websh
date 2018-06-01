FROM alpine:latest

RUN apk --update --no-cache add \
  nodejs \
  python \
  make \
  g++ \
  sudo

ENV NODE_ENV=production
WORKDIR /app

COPY ./package.json /app/package.json
RUN npm install

COPY ./build /app/build

COPY ./docker/alpine/entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

CMD ["/usr/bin/env", "npm", "start"]
