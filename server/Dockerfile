FROM node:18.18.0-alpine as dependencies

COPY package.json package-lock.json ./
RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]