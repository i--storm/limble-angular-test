FROM node:alpine

WORKDIR /usr/src/app

RUN apk add git && git clone https://github.com/i--storm/limble-angular-test .

RUN npm install -g @angular/cli

RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]
