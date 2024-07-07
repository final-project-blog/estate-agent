# Estate Agent App

This repository contains the Estate Agent App, a web application with a Frontend and Backend service. Below are the instructions for setting up and configuring the application,
including the Nginx configuration to deploy the complete application in one EC2

## Table of Contents
- [Application Configuration](#Application-configuration)
- [Nginx Configuration](#nginx-configuration)
  - [Prerequisites](#prerequisites)
  - [EC2 Nginx Configuration](#ec2-nginx-configuration)

## Application Configuration

1. **Proxy the Application:**

   Update your Vite configuration (`vite.config.js`) to proxy requests to `/api` to your backend server:

   ```javascript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react-swc'

   export default defineConfig({
     server: {
       proxy: {
         '/api': {
           target: "http://localhost:3000",
           secure: false,
           changeOrigin: true
         },
       },
     },
     plugins: [
       react(),
     ],
   })

2. **Build the App and Move the `dist` Folder:**

   After building your frontend application, move the `dist` folder to the backend (`api`) folder:

   ```sh
   npm run build
   mv dist api

3. **Configure Backend to Serve Static Files:**

   Add the following line to your `index.js` (or main backend file) to serve static files from the `dist` directory:

   ```javascript
   app.use(express.static('dist'));

4. **Build Docker Image for Backend:**

   Build the Docker image for your backend application using the Dockerfile in your backend directory. Replace `<backend-image-tag>` with a suitable tag for your Docker image.

   ```sh
   docker build -t <backend-image-tag> .

## Nginx Configuration
    
### Prerequisites
- Nginx installed

1. Install Nginx:
    ```sh
    sudo yum install -y nginx
    ```

2. Start Nginx:
    ```sh
    sudo systemctl start nginx
    ```

3. Enable Nginx to start on boot:
    ```sh
    sudo systemctl enable nginx
    ```

### FEC2 Nginx Configuration

1. Edit the Nginx configuration file:
    ```sh
    sudo vim /etc/nginx/nginx.conf
    ```

2. Add the following configuration:
    ```nginx
    server {
        listen       80;
        listen       [::]:80;
        server_name  _;

        location / {
            proxy_pass http://localhost:3000;
        }
    }
    ```
3. Save and close the file.

4. Restart Nginx to apply the changes:
    ```sh
    sudo systemctl restart nginx
    ```

