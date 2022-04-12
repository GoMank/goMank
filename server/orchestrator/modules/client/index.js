const { gql } = require('apollo-server');
const axios = require('axios');
const redis = require('../../config');
const url = 'http://04d5-139-0-237-101.ngrok.io/';

const typeDefs = gql`
    extend type Query {
        clients: [Client]
        client(id: ID!): Client
    }

    type Address {
        lng: String
        lat: String
    }

    extend type Mutation {
        createClient(
            name: String!
            email: String!
            password: String!
            address: String!
            phone: String!
            image: String!
            norek: String!
            saldo: Int!
        ): Client
        updateClient(
            id: ID!
            name: String!
            email: String!
            password: String!
            address: String!
            phone: String!
            image: String!
            norek: String!
            saldo: Int!
        ): Client
        deleteClient(id: ID!): Client
    }

    type Client {
        id: ID!
        name: String!
        email: String!
        password: String!
        address: Address!
        phoneNumber: String!
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

        client: async (parent, args, context, info) => {
            try {
                console.log(`masuk ko ga ${args.id}`);
                const clientCache = await redis.get('clients');
                let clients = JSON.parse(clientCache);
                let client;
                console.log(clients);
                if (!clients) {
                    client = await axios.get(url + 'clients/' + args.id);
                    console.log(client);
                    client = client.data;
                }
                client = clients.find((client) => client._id === args.id);
                return client;
            } catch (err) {
                console.log(err);
            }
        },
    },

    Mutation: {
        createClient: async (parent, args, context, info) => {
            try {
                const client = await axios.post(url + 'clients', args);
                await redis.del('clients');
                return client.data;
            } catch (err) {
                console.log(err);
            }
        },

        updateClient: async (parent, args, context, info) => {
            try {
                const client = await axios.put(url + 'clients/' + args.id, args);
                await redis.del('clients');
                return client.data;
            } catch (err) {
                console.log(err);
            }
        },

        deleteClient: async (parent, args, context, info) => {
            try {
                const client = await axios.delete(url + 'clients/' + args.id);
                await redis.del('clients');
                return client.data;
            } catch (err) {
                console.log(err);
            }
        },
    },
};

module.exports = {
    typeDefs,
    resolvers,
};
