import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://b3ba-180-252-115-233.ngrok.io',
    cache: new InMemoryCache(),
});

export default client;
