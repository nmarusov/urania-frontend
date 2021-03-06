# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:10 as build-stage

WORKDIR /app

COPY package*.json /app/

RUN yarn install

COPY ./ /app/

ARG FRONTEND_ENV=production

ENV VUE_APP_ENV=${FRONTEND_ENV}

RUN yarn build


# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.19

COPY --from=build-stage /app/dist/ /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
