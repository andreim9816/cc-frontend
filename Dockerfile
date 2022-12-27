# stage 1

FROM node:alpine AS banking-gui-build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# stage 2

FROM nginx:alpine
COPY --from=banking-gui-build /app/dist/banking-gui /usr/share/nginx/html
EXPOSE 80
