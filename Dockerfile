FROM node:lts-bullseye

#ENV NODE_OPTIONS=--openssl-legacy-provider

WORKDIR /usr/src/app

COPY . .

RUN npm install && npm run build

EXPOSE 3000
CMD ["npm", "start"]