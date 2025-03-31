import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_HTTP_ENDPOINT as string,
  headers: {
    "x-hasura-admin-secret": process.env
      .NEXT_PUBLIC_HASURA_ADMIN_SECRET as string,
  },
})

const serverApollo = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

export default serverApollo
