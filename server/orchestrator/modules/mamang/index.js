const { gql } = require('apollo-server');
const axios = require('axios');
const redis = require('../../config');
const url = 'https://cc89-139-0-237-101.ngrok.io/';

const typeDefs = gql`
    extend type Query {
        mamangs: [Mamang]
        mamang(id: ID!): Mamang
    }

    type responseMamang {
        message: String
    }
    extend type Mutation {
        createMamang(
            name: String!
            email: String!
            password: String!
            address: String!
            phoneNumber: String!
            gender: String!
            image: String!
            rekNumber: String!
        ): Mamang
        updateMamang(
            _id: ID!
            name: String
            email: String
            password: String
            address: String
            phoneNumber: String
            gender: String
            image: String
            rekNumber: String
            saldo: Int
        ): Mamang
        deleteMamang(id: ID!): responseMamang
    }

    type Mamang {
        _id: ID!
        name: String
        email: String
        password: String
        address: String
        phoneNumber: String
        gender: String
        image: String
        rekNumber: String
        saldo: Int
    }
`;

const resolvers = {
    Query: {
        mamangs: async () => {
            try {
                const mamangsCache = await redis.get('mamangs');
                let mamangs = JSON.parse(mamangsCache);

                if (!mamangs) {
                    mamangs = await axios.get(url + 'mamangs');
                    mamangs = mamangs.data;
                    redis.set('mamangs', JSON.stringify(mamangs));
                }
                return mamangs;
            } catch (err) {
                throw new Error(err);
            }
        },

        mamang: async (parent, args, context, info) => {
            try {
                const mamangCache = await redis.get('mamangs');
                let mamangs = JSON.parse(mamangCache);
                let mamang;
                if (!mamangs) {
                    mamang = await axios.get(url + args.id);
                    mamang = mamang.data;
                }
                mamang = mamangs.find((mamang) => mamang._id === args.id);
                console.log(mamang);
                return mamang;
            } catch (err) {
                throw new Error(err);
            }
        },
    },

    Mutation: {
        createMamang: async (parent, args, context, info) => {
            try {
                console.log(args);
                const { data } = await axios.post(url + 'mamangs/register', args);
                console.log(data, '<<<<<<<<<<<<');
                redis.del('mamangs');
                return data;
            } catch (err) {
                console.log(err.response);
                throw new Error(err.response.message);
            }
        },
        updateMamang: async (parent, args, context, info) => {
            try {
                console.log(`masuk ga`, args);
                const { data } = await axios.patch(url + 'mamangs/' + args._id, {
                    saldo: args.saldo,
                });
                redis.del('mamangs');
                return data;
            } catch (err) {
                throw new Error(err);
            }
        },
        deleteMamang: async (parent, args, context, info) => {
            try {
                console.log(`masuk ga`, args);
                const { data } = await axios.delete(url + 'mamangs/' + args.id);
                redis.del('mamangs');
                return data;
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
