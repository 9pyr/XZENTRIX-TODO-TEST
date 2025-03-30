import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { GraphQLWsLink } from "@apollo/client/link/subscriptions"
import { getMainDefinition } from "@apollo/client/utilities"
import { createClient } from "graphql-ws"

const HEADER = {
  "x-hasura-admin-secret": process.env
    .NEXT_PUBLIC_HASURA_ADMIN_SECRET as string,
  "Content-Type": "application/json",
}

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_HTTP_ENDPOINT as string,
  headers: HEADER,
})

const wsLink = new GraphQLWsLink(
  createClient({
    url: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_WS_ENDPOINT as string,
    connectionParams: async () => {
      // const session = await getSession()
      // const token = session?.accessToken
      return {
        headers: {
          ...HEADER,
          // Authorization: token ? `Bearer ${token}` : "",
        },
      }
    },
  })
)

const authLink = setContext(async (_, { headers }) => {
  // const session = await getSession()
  // const token = session?.accessToken
  return {
    headers: {
      ...headers,
      // Authorization: token ? `Bearer ${token}` : "",
    },
  }
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    )
  },
  wsLink,
  authLink.concat(httpLink)
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
})

export default client
