FROM node:8.9

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001
CMD [ "npm", "run", "start" ]