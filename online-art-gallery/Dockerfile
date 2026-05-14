# Dockerfile (place in your frontend project root)

# Stage 1 — build
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
# If you use pnpm or yarn, adapt accordingly
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Stage 2 — production nginx
FROM nginx:alpine AS production
# Remove default site config (optional) and copy a custom nginx conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Ensure proper permissions (optional on some systems)
RUN chown -R nginx:nginx /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
