const { gql } = require('apollo-server');
const axios = require('axios');
const redis = require('../../config');
const url = 'http://04d5-139-0-237-101.ngrok.io/';

const typeDefs = gql`
    extend type Query {
        histories: [History]
        history(id: ID!): History
    }

    type History {
        id: ID!
        noInvoice: String
        orderId: ID!
    }
`;

const resolvers = {
    Query: {
        histories: async (parent, args, context, info) => {
            try {
                const historiesCache = await redis.get('histories');
                let histories = JSON.parse(historiesCache);

                if (!histories) {
                    histories = await axios.get(url + 'histories');
                    histories = histories.data;
                    redis.set('histories', JSON.stringify(histories));
                }

                return histories;
            } catch (err) {
                throw new Error(err);
            }
        },

        history: async (parent, args, context, info) => {
            try {
                const historiesCache = await redis.get('histories');
                let histories = JSON.parse(historiesCache);
                let history;

                if (!histories) {
                    history = await axios.get(url + 'histories' + args.id);
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
