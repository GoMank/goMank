FROM node:16.4.2

WORKDIR /goMank/server/services/app

ENV PORT=4003

COPY package.json package-lock.json ./

RUN npm install && npm cache clean --force

RUN npm install -g nodemon

COPY ./ ./

CMD ["npm", "run", "start"]