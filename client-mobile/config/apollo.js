import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://3df7-182-0-231-141.ngrok.io',
    cache: new InMemoryCache(),
});

export default client;
