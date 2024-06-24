# Verwende ein passendes Basisimage, hier als Beispiel Node.js 14
FROM node:14

# Setze das Arbeitsverzeichnis innerhalb des Containers
WORKDIR /usr/src/app

# Kopiere die Abhängigkeitsdateien
COPY package*.json ./

# Installiere die Abhängigkeiten, einschließlich einer spezifischen Version von bcrypt
RUN npm install bcrypt@5.0.1

# Kopiere den gesamten Anwendungscode in das Arbeitsverzeichnis
COPY . .

# Baue die Anwendung
RUN npm run build

# Setze das Standardkommando für den Container
CMD ["node", "index.js"]
