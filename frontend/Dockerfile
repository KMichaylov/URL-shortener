FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

Expose 5173

CMD ["npm", "run", "dev"]