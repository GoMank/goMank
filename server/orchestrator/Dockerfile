FROM node:16.4.2

WORKDIR /server/orchestrator

ENV PORT = 4000

ENV REDIS_HOST="redis-18506.c1.ap-southeast-1-1.ec2.cloud.redislabs.com"

ENV REDIS_PASSWORD="6PD7FWi3OrEFHcZebTxR2JtqO947Ij28"

COPY package.json package-lock.json /server/orchestrator/

RUN npm install && npm cache clean --force

RUN npm install -g nodemon

COPY ./ ./

CMD ["npm", "run", "start"]