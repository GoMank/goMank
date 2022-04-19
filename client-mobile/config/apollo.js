import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://c2f7-180-252-122-92.ngrok.io',
    cache: new InMemoryCache(),
});

export default client;
