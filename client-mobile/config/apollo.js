import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

const client = new ApolloClient({
<<<<<<< HEAD
    uri: 'https://old-falcon-74.loca.lt/',
=======
    uri: 'https://old-falcon-74.loca.lt',
>>>>>>> 4271c2300cc12fcd208451e5f7098bfbb84f1336
    cache: new InMemoryCache(),
});

export default client;
