import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://gomank-apollo.herokuapp.com/',
    cache: new InMemoryCache(),
});

export default client;
