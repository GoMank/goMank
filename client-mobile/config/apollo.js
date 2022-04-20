import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://ea51-180-252-117-21.ngrok.io',
    cache: new InMemoryCache(),
});

export default client;
