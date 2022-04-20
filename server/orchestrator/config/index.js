if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const Redis = require('ioredis');

const redis = new Redis({
    port: 18506,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
});

module.exports = redis;
