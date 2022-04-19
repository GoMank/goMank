import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://spotty-deer-75.loca.lt',
    cache: new InMemoryCache(),
});

export default client;
