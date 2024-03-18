FROM node:18
COPY package.json /usr/src/www/package.json
WORKDIR /usr/src/www
RUN npm --registry https://registry.npmmirror.com install
