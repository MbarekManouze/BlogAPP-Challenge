FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm config set fetch-retries 5
RUN npm config set fetch-retry-mintimeout 20000
RUN npm config set fetch-retry-maxtimeout 120000

RUN npm install

COPY prisma/ ./prisma/

RUN npx prisma migrate dev


COPY . .

RUN npm run dev

EXPOSE 3000

CMD ["npm", "start"]
