import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://nervous-baboon-89.loca.lt',
    cache: new InMemoryCache(),
});

export default client;
