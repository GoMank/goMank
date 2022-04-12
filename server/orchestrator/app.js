const { ApolloServer } = require('apollo-server');

const server = new ApolloServer({
    modules: [
        require('./modules/mamang'),
        require('./modules/order'),
        require('./modules/client'),
    ],
});

server.listen().then(({ url }) => console.log(`server started at ${url}`));
