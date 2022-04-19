const { gql } = require('apollo-server');
const axios = require('axios');
const redis = require('../../config');
const url = 'https://popular-squid-31.loca.lt/';

const typeDefs = gql`
    extend type Query {
        histories: [History]
        history(id: ID!): History
    }

    type History {
        id: ID!
        description: String
        createdAt: String
        orderId: ID!
    }

    extend type Client {
        histories: [History]
    }
`;

const resolvers = {
    Query: {
        histories: async (parent, args, context, info) => {
            try {
                console.log(`masuk histories`);
                const historiesCache = await redis.get('logs');
                let histories;

                if (!historiesCache) {
                    console.log(`histories tidak ada`, histories);
                    histories = await axios.get(url + 'logs');
                    histories = histories.data;
                    redis.set('logs', JSON.stringify(histories));
                } else {
                    histories = JSON.parse(historiesCache);
                }

                return histories;
            } catch (err) {
                throw new Error(err);
            }
        },

        history: async (parent, args, context, info) => {
            try {
                const historiesCache = await redis.get('logs');
                return JSON.parse(historiesCache).find((history) => history.id == args.id);
            } catch (err) {
                throw new Error(err);
            }
        },
    },

    Client: {
        histories: async (parent, args, context, info) => {
            try {
                console.log(`masuk histories`);
                const historiesCache = await redis.get('logs');
                let histories = JSON.parse(historiesCache);

                if (!histories) {
                    console.log(`histories tidak ada`, histories);
                    histories = await axios.get(url + 'logs');
                    histories = histories.data;
                    redis.set('logs', JSON.stringify(histories));
                }

                return histories;
            } catch (err) {
                throw new Error(err);
            }
        },
    },
};

module.exports = {
    typeDefs,
    resolvers,
};
