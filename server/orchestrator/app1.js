if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const { ApolloServer } = require('apollo-server');
const PORT = process.env.PORT || 4000;
const { Query, Mutation, typeDefs } = require('./resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query,
        Mutation,
    },
    playground: true,
    introspection: true,
});

server.listen(PORT).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
