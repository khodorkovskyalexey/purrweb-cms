FROM node:12

WORKDIR /purrweb/src/app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["node", "dist/main"]