FROM node:16.4.2

WORKDIR /goMank/server/services/mamangs

ENV PORT=4005

ENV URI_MONGO="mongodb+srv://gomank:tukangculik@gomank.0mu6i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

COPY package.json package-lock.json /goMank/server/services/mamang/

RUN npm install && npm cache clean --force

RUN npm install -g nodemon

COPY ./ ./

CMD ["npm", "run", "start"]