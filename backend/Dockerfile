#Build stage
FROM node:16-alpine AS build

WORKDIR /app

COPY package*.json .

COPY . .
RUN ls -la

RUN npm install


RUN npm run build

#Production stage
FROM node:16-alpine AS production

WORKDIR /app

COPY package*.json .

RUN npm ci --only=production

COPY --from=build /app/.dist ./.dist
RUN ls -la

CMD ["node", ".dist/app.js"]