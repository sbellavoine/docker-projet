FROM node:20-alpine

LABEL maintainer="Corentin Vyncke"
LABEL version="1.0"
LABEL description="Orders microservice"

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY app.js ./

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 5003

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost:5003/health || exit 1

CMD ["npm", "start"]