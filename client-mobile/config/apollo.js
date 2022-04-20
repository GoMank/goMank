import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://old-falcon-74.loca.lt',
    cache: new InMemoryCache(),
});

export default client;
