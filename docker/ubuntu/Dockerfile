FROM ubuntu:latest

ADD https://deb.nodesource.com/setup_10.x /tmp/nodejs.sh
RUN apt-get update \
  && apt-get install -y gnupg \
  && bash /tmp/nodejs.sh \
  && apt-get install -y nodejs \
  make \
  g++ \
  sudo \
  && apt-get clean

ADD https://raw.githubusercontent.com/KittyKatt/screenFetch/master/screenfetch-dev \
  /bin/screenfetch
RUN chmod 755 /bin/screenfetch

ENV NODE_ENV=production
WORKDIR /app

COPY ./package.json /app/package.json
RUN npm install

COPY ./build /app/build

COPY ./docker/ubuntu/entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

CMD ["/usr/bin/env", "npm", "start"]