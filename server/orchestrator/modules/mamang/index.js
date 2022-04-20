const { gql } = require('apollo-server');
const axios = require('axios');
const redis = require('../../config');
const url = 'https://big-penguin-91.loca.lt/';

const typeDefs = gql`
    extend type Query {
        mamangs: [Mamang]
        mamang(id: ID!): Mamang
    }

    type responseMamang {
        message: String
    }

    type Address {
        type: String
        coordinates: [Float]
    }

    # input AddressInput {
    #     type: String
    #     coordinates: [Float]
    # }

    extend type Mutation {
        createMamang(
            name: String
            email: String
            password: String
            address: String
            phoneNumber: String
            gender: String
            image: String
            rekNumber: String
        ): Mamang
        nearestMamang(location: [Float]): [Mamang]
        updateMamang(_id: ID, address: [Float]): Mamang
        deleteMamang(id: ID!): responseMamang
    }

    type Mamang {
        _id: ID!
        name: String
        email: String
        password: String
        address: Address
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
                    console.log(mamangs);
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
                const { data } = await axios.post(url + 'mamangs/register', args);
                redis.del('mamangs');
                return data;
            } catch (err) {
                throw new Error(err.response.message);
            }
        },

        nearestMamang: async (parent, args, context, info) => {
            try {
                console.log('masuk nearest', JSON.stringify(args.location));
                const mamangs = await axios.post(url + 'mamangs/nearest', {
                    location: JSON.stringify(args.location),
                });
                console.log(mamangs);
                return mamangs.data.mamangs;
            } catch (err) {
                throw new Error(err);
            }
        },

        updateMamang: async (parent, args, context, info) => {
            try {
                // console.log(url + 'mamangs/address/' + args._id);
                // console.log(`masuk`, args.address, args._id);

                const { data } = await axios.patch(url + 'mamangs/address/' + args._id, {
                    address: JSON.stringify(args.address),
                });
                console.log(data, '<<<<<<<<<<<<');
                return data;
            } catch (err) {
                throw new Error(err);
            }
        },

        deleteMamang: async (parent, args, context, info) => {
            try {
                console.log(`masuk ga`, args);
                const { data } = await axios.delete(url + 'mamangs/' + args._id);
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
