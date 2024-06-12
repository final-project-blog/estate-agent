# Verwenden Sie ein Basisimage mit Node.js
FROM node:latest

# Arbeitsverzeichnis im Container erstellen
WORKDIR /usr/src/app

# Kopieren Sie das Paketmanifest und die Lock-Dateien in das Arbeitsverzeichnis
COPY package*.json ./

# Installieren Sie die Abhängigkeiten
RUN npm install

# Kopieren Sie den Rest des Backend-Codes in das Arbeitsverzeichnis
COPY . .

# Exponieren Sie den Port, auf dem Ihre Anwendung läuft
EXPOSE 3000

# Befehl zum Ausführen Ihrer Anwendung
CMD ["npm", "start"]
