"use client"

import client from "@/lib/apolloClient"
import { ApolloProvider } from "@apollo/client"
import { SessionProvider } from "next-auth/react"
import React from "react"

const Provider = ({ children }: React.PropsWithChildren) => {
  return (
    <SessionProvider>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </SessionProvider>
  )
}

export default Provider
