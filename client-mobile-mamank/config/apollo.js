import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://92c1-180-252-115-233.ngrok.io',
    cache: new InMemoryCache(),
});

export default client;
