import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
  } from "@apollo/client";

  const client = new ApolloClient({
    uri: 'http://6628-114-10-25-12.ngrok.io',
    cache: new InMemoryCache()
  });

  

  export default client