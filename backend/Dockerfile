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

CMD ["node", ".dist/app.js"]

# #Production stage
# FROM node:16-alpine AS production

# WORKDIR /app

# COPY packages/m-skauting-sdk packages/m-skauting-sdk
# WORKDIR /app/packages/m-skauting-sdk
# RUN npm install

# WORKDIR /app/backend
# COPY backend/package*.json .

# RUN npm install

# COPY --from=build /app/backend/.dist ./.dist
# RUN ls -la

# CMD ["node", ".dist/app.js"]