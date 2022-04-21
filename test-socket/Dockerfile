FROM node:16.4.2

WORKDIR /goMank/test-socket

ENV PORT=3000

ENV MONGO_URI=mongodb+srv://dzulfiqarzaky:2sGulkifj5FJpoSF@cluster0.zvlbq.mongodb.net/myFirstDatabase

COPY package.json package-lock.json ./

RUN npm install && npm cache clean --force

RUN npm install -g nodemon

COPY ./ ./

CMD ["npm", "run", "start"]