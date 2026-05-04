# Stage 1 - build
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install pg

COPY . .

# Stage 2 - runtime
FROM node:20-alpine

WORKDIR /app
COPY --from=builder /app .

EXPOSE 3000

CMD ["node", "app.js"]

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
