#Build stage
FROM node:16-alpine AS build

WORKDIR /app

# COPY ../packages/m-skauting-sdk .
# COPY ../backend .

COPY . .

RUN ls -la

COPY package*.json .



WORKDIR /app/packages/m-skauting-sdk
RUN npm install

WORKDIR /app/backend
RUN npm install

WORKDIR /app/backend
RUN npm run build

#Production stage
FROM node:16-alpine AS production

WORKDIR /app

COPY package*.json .

RUN npm ci --only=production

COPY --from=build /app/.dist ./.dist
RUN ls -la

CMD ["node", ".dist/app.js"]