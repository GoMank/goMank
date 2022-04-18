import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
  } from "@apollo/client";

  const client = new ApolloClient({
    uri: 'https://2be5-125-164-21-106.ngrok.io',
    cache: new InMemoryCache()
  });

  

  export default client