FROM debian:latest

ADD https://deb.nodesource.com/setup_10.x /tmp/nodejs.sh
RUN apt-get update \
  && apt-get install -y gnupg \
  && bash /tmp/nodejs.sh \
  && apt-get install -y nodejs \
  make \
  g++ \
  sudo \
  && apt-get clean

ENV NODE_ENV=production
WORKDIR /app

COPY ./package.json /app/package.json
RUN npm install

COPY ./build /app/build

COPY ./docker/centos/entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

CMD ["/usr/bin/env", "npm", "start"]