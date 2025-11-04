FROM node:20-alpine


WORKDIR /app


COPY package.json pnpm-lock.yaml* ./

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile


COPY . .


RUN pnpm run build


EXPOSE 4000


CMD ["node", "dist/main"]
