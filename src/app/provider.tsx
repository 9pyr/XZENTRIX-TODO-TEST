"use client"

import client from "@/lib/apolloClient"
import { ApolloProvider } from "@apollo/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"
import React, { useState } from "react"

const Provider = ({ children }: React.PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default Provider
