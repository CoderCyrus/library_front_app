FROM node:13.3-alpine

WORKDIR /app

COPY . .
RUN npm install
RUN npm install -g @angular/cli@8.3.20

CMD ng serve --host 0.0.0.0 