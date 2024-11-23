import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import DashboardContainer from '@/scenes/Dashboard/DashboardContainer'

const queryClient = new QueryClient()

queryClient.setDefaultOptions({
  queries: {
    staleTime: Infinity,
  },
})

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div data-testid="app-id">
        <DashboardContainer />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
