# Stage 1: Build the application
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
# Copy the built assets from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html
# Copy custom nginx config if we had one (using default for now which is fine for static sites)
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
