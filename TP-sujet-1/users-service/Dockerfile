FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5001

HEALTHCHECK CMD wget -qO- http://localhost:5001/health || exit 1

CMD ["node", "server.js"]