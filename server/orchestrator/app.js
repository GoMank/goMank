if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const { ApolloServer } = require('apollo-server');
const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
    cors: true,
    modules: [
        require('./modules/mamang'),
        require('./modules/order'),
        require('./modules/client'),
        require('./modules/history'),
    ],
    playground: true,
    introspection: true,
});

server.listen(PORT).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
