# Verwende ein Basisimage für das Frontend (Node.js)
FROM node:lts-alpine AS builder

# Setze das Arbeitsverzeichnis im Container für das Frontend
WORKDIR /app

# Kopiere die package.json und package-lock.json und installiere die Abhängigkeiten für das Frontend
COPY package*.json ./
RUN npm ci 

# Kopiere den Rest der Frontend-Anwendungsdateien
COPY . .

# Baue das Frontend
RUN npm run build

# Verwende ein Basisimage für den Webserver (Nginx)
FROM nginx:alpine

# Kopiere die Konfigurationsdatei für Nginx
#COPY nginx.conf /etc/nginx/nginx.conf

# Kopiere die gebauten Dateien aus dem vorherigen Container zum Nginx-Verzeichnis
#COPY --from=builder /app/build /usr/share/nginx/html

# Exponiere Port 80
EXPOSE 80

# Befehl, um den Nginx-Webserver auszuführen
CMD ["nginx", "-g", "daemon off;"]


