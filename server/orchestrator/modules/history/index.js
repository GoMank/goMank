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
`;

const resolvers = {
    Query: {
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

        history: async (parent, args, context, info) => {
            try {
                const historiesCache = await redis.get('logs');
                let histories = JSON.parse(historiesCache);
                let history;

                if (!histories) {
                    history = await axios.get(url + 'logs' + args.id);
                    history = history.data;
                }

                history = histories.find((history) => history.id === args.id);
                return history;
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
