
FROM node:20-alpine AS builder
WORKDIR /app


COPY package.json pnpm-lock.yaml* ./

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile


COPY . .


RUN pnpm prisma generate
RUN pnpm run build


FROM node:20-alpine
WORKDIR /app


COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm
RUN pnpm install --prod --frozen-lockfile


COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 4000
CMD ["node", "dist/src/main.js"]
