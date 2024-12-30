FROM node:22.3.0-alpine3.20 AS npm_install
WORKDIR /ruah
COPY package.json package-lock.json .
RUN npm install

FROM npm_install AS full_set
COPY . .

FROM full_set AS unitary_test
CMD npm test

FROM full_set as build_module
RUN npm run build
CMD cat dist/hp.umd.js

FROM full_set AS integration_test
CMD npm run full_test

