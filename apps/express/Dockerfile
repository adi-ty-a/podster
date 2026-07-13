FROM node:22-alpine 

WORKDIR /app

COPY package.json .

RUN pnpm install

COPY . .

RUN pnpm prisma migrate dev
 
RUN pnpm prisma generate

RUN 

CMD ["pnpm","run","start"]