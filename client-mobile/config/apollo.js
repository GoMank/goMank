import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://135b-180-252-113-132.ngrok.io',
    cache: new InMemoryCache(),
});

export default client;
