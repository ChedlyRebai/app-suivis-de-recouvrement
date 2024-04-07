import {
    QueryClient,
    QueryClientProvider,
    useQuery,
  } from '@tanstack/react-query'
import { ReactNode } from 'react'
  
const queryClient = new QueryClient()

const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      )
}

export default ReactQueryProvider