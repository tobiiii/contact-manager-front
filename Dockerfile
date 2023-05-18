# Stage 1: Build the Angular app
FROM node:14 AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Stage 2: Serve the Angular app with a lightweight web server
FROM nginx:alpine
COPY --from=build /usr/src/app/dist/contact-manager-front /usr/share/nginx/html
EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]
