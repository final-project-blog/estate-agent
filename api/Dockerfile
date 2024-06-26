# Verwende ein neueres Node.js Basisimage
FROM node:16

# Setze das Arbeitsverzeichnis
WORKDIR /usr/src/app

# Kopiere package.json und package-lock.json
COPY package*.json ./

# Installiere Abhängigkeiten und baue native Module neu
RUN npm install && npm rebuild bcrypt --build-from-source

# Kopiere Anwendungscode
COPY . .

# Setze Umgebungsvariablen
ARG MONGO_URI
ENV MONGO_URI=${MONGO_URI}

# Exponiere den Port
EXPOSE 3000

# Startbefehl für die Anwendung
CMD ["npm", "start"]

