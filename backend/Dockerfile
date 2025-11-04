FROM node:20-alpine

WORKDIR /app/backend

COPY backend/package.json backend/pnpm-lock.yaml* ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY backend/. .
RUN pnpm run build

EXPOSE 4000

CMD ["node", "dist/main"]
