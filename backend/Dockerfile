FROM node:20-alpine

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY pnpm-lock.yaml ./

COPY package*.json ./

RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm","run","start:dev"]