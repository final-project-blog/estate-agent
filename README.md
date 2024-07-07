# Estate Agent App

This repository contains the Estate Agent App, a web application with a Frontend and Backend service. Below are the instructions for setting up and configuring the application, including the Nginx configuration for the Frontend

## Table of Contents
- [Prerequisites](#prerequisites)
- [Nginx Configuration](#nginx-configuration)
  - [Frontend Configuration](#frontend-configuration)

## Prerequisites
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

## Nginx Configuration

### Frontend Configuration

The Frontend is served using Nginx. Below is the configuration to serve the Frontend from a Docker container:

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
            proxy_pass http://localhost:4000;
        }
        location /api {
            proxy_pass http://backend-ip:3000;
        }

    }
    ```
3. Save and close the file.

4. Restart Nginx to apply the changes:
    ```sh
    sudo systemctl restart nginx
    ```

