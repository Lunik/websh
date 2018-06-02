FROM fedora:latest

ADD https://rpm.nodesource.com/setup_10.x /tmp/nodejs.sh
RUN bash /tmp/nodejs.sh \
  && yum install -y nodejs \
  make \
  gcc-c++ \
  sudo \
  && yum clean all

ADD https://raw.githubusercontent.com/KittyKatt/screenFetch/master/screenfetch-dev \
  /bin/screenfetch
RUN chmod 755 /bin/screenfetch

ENV NODE_ENV=production
WORKDIR /app

COPY ./package.json /app/package.json
RUN npm install

COPY ./build /app/build

COPY ./docker/fedora/entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 3000

CMD ["/usr/bin/env", "npm", "start"]