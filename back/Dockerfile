FROM node:22

WORKDIR /usr/app

COPY package*.json ./
RUN npm i

COPY . .

EXPOSE 3000



CMD ["npm", "run", "start:migrate"]
