const { gql } = require('apollo-server');
const axios = require('axios');
const redis = require('../../config');
const url = 'http://localhost:3000/';

const typeDefs = gql`
    extend type Query {
        mamangs: [Mamang]
        mamang(id: ID!): Mamang
    }

    type Skill {
        id: ID!
        name: String!
    }

    type Mamang {
        id: ID!
        name: String!
        email: String!
        password: String!
        address: String!
        phone: String!
        image: String!
        norek: String!
        skills: [Skill]
        saldo: Int!
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
                    console.log(mamangs);
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
                mamang = mamangs.find((mamang) => mamang.id === args.id);
                return mamang;
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
