# Build stage
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage - serve with simple static server
FROM node:18-alpine

WORKDIR /app

# Install a simple static server
RUN npm install -g serve

# Copy built files
COPY --from=builder /app/dist /app/dist

EXPOSE 4173

CMD ["serve", "-s", "dist", "-l", "4173"]