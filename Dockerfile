FROM node:18.17 as setup

WORKDIR /app

RUN npm i -g @quasar/cli

COPY package* .

RUN npm install

COPY . .

RUN quasar build


FROM nginx as runner

WORKDIR /app

COPY --from=setup /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=setup /app/ .

