const { gql } = require('apollo-server');
const axios = require('axios');
const redis = require('../../config');
const url = 'http://localhost:3000/';

const typeDefs = gql`
    extend type Query {
        clients: [Client]
        client(id: ID!): Client
    }

    type Client {
        id: ID!
        name: String!
        email: String!
        password: String!
    }
`;

const resolvers = {
    Query: {
        clients: async () => {
            try {
                const clientsCache = await redis.get('clients');
                let clients = JSON.parse(clientsCache);

                if (!clients) {
                    clients = await axios.get(url + 'clients');
                    clients = clients.data;
                    redis.set('clients', JSON.stringify(clients));
                }

                return clients;
            } catch (err) {
                console.log(`Error: ${err}`);
            }
        },
    },
};

module.exports = {
    typeDefs,
    resolvers,
};
