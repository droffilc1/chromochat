FROM node:20-iron

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

ENV NODE_ENV production

CMD [ "npm", "start" ]


