# stage 1

FROM node:alpine AS banking-gui-build
WORKDIR /app

COPY package*.json /app/
RUN npm install
COPY ./ /app/
ARG configuration=production
RUN npm run build -- --output-path=./dist/out


# stage 2

FROM nginx:alpine
#Copy ci-dashboard-dist
COPY --from=banking-gui-build /app/dist/out/ /usr/share/nginx/html
#Copy default nginx configuration
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
