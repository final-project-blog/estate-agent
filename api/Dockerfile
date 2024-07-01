# Verwende ein neueres Node.js Basisimage
FROM node:lts-alpine

# Setze das Arbeitsverzeichnis
WORKDIR /usr/src/app

# Kopiere package.json und package-lock.json
COPY package*.json ./

# Installiere Abhängigkeiten und baue native Module neu
RUN npm install 

# Kopiere Anwendungscode
COPY . .


# Exponiere den Port
EXPOSE 3000

# Startbefehl für die Anwendung
CMD ["npm", "start"]

