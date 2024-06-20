import { useState, useEffect } from 'react'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

/* hooks */
import { useAppSelector } from './hooks/reduxHooks.ts'

/* providers */
import ActualRouter from './providers/RouterProvider.tsx'

function App() {
  const httpLink = createHttpLink({
    uri: import.meta.env.VITE_BASE_URL + '/graphql',
  })

  const createUnauthenticatedClient = () => {
    return new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache(),
    })
  }

  const createAuthenticatedClient = (token: string) => {
    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        },
      }
    })

    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    })
  }

  const token = useAppSelector((state) => state.user.token)
  const [client, setClient] = useState(createUnauthenticatedClient)

  useEffect(() => {
    if (token) {
      setClient(createAuthenticatedClient(token))
    } else {
      setClient(createUnauthenticatedClient())
    }
  }, [token])

  return (
    <ApolloProvider client={client}>
      <ActualRouter />
    </ApolloProvider>
  )
}

export default App
