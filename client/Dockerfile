# Stage 1: Build the frontend application
FROM node:14 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the built frontend application using nginx
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

# Kopieren der gebauten statischen Dateien aus dem ersten Stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]




