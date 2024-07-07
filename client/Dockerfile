# Stage 1: Build the frontend application
FROM node:lts-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the built frontend application using nginx
FROM nginx:alpine


# Kopieren der gebauten statischen Dateien aus dem ersten Stage
COPY --from=build /app/dist /usr/share/nginx/html


EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]














