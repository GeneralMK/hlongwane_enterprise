import { ApolloProvider } from '@apollo/client'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import type { PropsWithChildren } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { apolloClient } from '../lib/apollo'

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>{children}</BrowserRouter>
      </ApolloProvider>
    </ChakraProvider>
  )
}
