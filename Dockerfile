FROM node:10
RUN curl https://install.meteor.com/ | sh
RUN meteor update --allow-superuser

WORKDIR /opt
COPY package.json .
COPY package-lock.json .
RUN npm i
COPY . .
