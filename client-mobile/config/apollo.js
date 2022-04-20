import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://happy-impala-36.loca.lt',
    cache: new InMemoryCache(),
});

export default client;
