FROM node:18-alpine

WORKDIR /home

COPY package.json .
COPY package-lock.json .
RUN npm i --omit=dev

COPY app app/
COPY bin/www.ts bin/
COPY lib lib/
COPY public/favicon.ico public/
COPY utils utils/
COPY views views/

EXPOSE 3000
CMD [ "npm", "run", "start" ]
