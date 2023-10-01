FROM node:18.18.0-alpine as dependencies

COPY tsconfig.json ./
COPY package.json package-lock.json ./
COPY knexfile.ts ./
COPY src/ ./src/

RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]