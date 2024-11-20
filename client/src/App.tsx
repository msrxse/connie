import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Dashboard from '@/scenes/Dashboard/Dashboard'

import styles from './App.module.css'

const queryClient = new QueryClient()

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <main data-testid="app-id" className={styles.main}>
        <Dashboard />
      </main>
    </QueryClientProvider>
  )
}

export default App
