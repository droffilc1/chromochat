FROM node:20-alpine

WORKDIR /app

COPY src/package*.json ./

COPY src/prisma ./prisma

RUN npm install

COPY src .

RUN npm run build

EXPOSE 3000

ENV NODE_ENV production

CMD ["npm", "start"]
