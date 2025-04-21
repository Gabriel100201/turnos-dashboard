# Etapa 1: build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY next.config.ts ./
COPY prisma ./prisma
COPY . .

RUN npm install
RUN npm run build

# Etapa 2: producción
FROM node:20-alpine AS runner

ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.env ./.env

# Puerto por defecto
EXPOSE 3000

CMD ["node", "server.js"]
