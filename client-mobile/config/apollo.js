import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
  } from "@apollo/client";

  const client = new ApolloClient({
    uri: 'https://146d-180-252-127-246.ngrok.io',
    cache: new InMemoryCache()
  });

  

  export default client