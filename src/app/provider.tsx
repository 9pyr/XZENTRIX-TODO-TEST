"use client"

import apolloClient from "@/lib/apolloClient"
import { ApolloProvider } from "@apollo/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"
import React, { useState } from "react"

const Provider = ({ children }: React.PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <SessionProvider>
      <ApolloProvider client={apolloClient}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ApolloProvider>
    </SessionProvider>
  )
}

export default Provider
