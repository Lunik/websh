FROM alpine:latest

RUN apk --update --no-cache add \
  nodejs \
  nodejs-npm \
  python \
  make \
  g++ \
  sudo \
  bash

ADD https://raw.githubusercontent.com/KittyKatt/screenFetch/master/screenfetch-dev \
  /bin/screenfetch
RUN chmod 755 /bin/screenfetch

ENV NODE_ENV=production
WORKDIR /app

COPY ./package.json /app/package.json
RUN npm install

COPY ./build /app/build

COPY ./docker/alpine/entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

CMD ["/usr/bin/env", "npm", "start"]
