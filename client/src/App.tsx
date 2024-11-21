import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import Dashboard from '@/scenes/Dashboard/Dashboard'

import styles from './App.module.css'

const queryClient = new QueryClient()

queryClient.setDefaultOptions({
  queries: {
    staleTime: Infinity,
  },
})

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <main data-testid="app-id" className={styles.main}>
        <Dashboard />
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
