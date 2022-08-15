FROM node:14.17.3-slim AS build
WORKDIR /app
RUN npm i -g npm@7.20.6 && apt -y update && apt install -y git
COPY ./package*.json ./
RUN npm install 
COPY . .
RUN npm run build
FROM nginx:1.23.1-alpine
RUN chown -R nginx:nginx /usr/share/nginx/html && \
        chmod -R 755 /usr/share/nginx/html && \
        chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid
COPY --from=build /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;" ]
