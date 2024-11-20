import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import './main.css'

// The root element where React will be mounted.
const root = createRoot(document.getElementById('root') as HTMLElement)

async function enableMocking() {
  if (import.meta.env.MODE !== 'development') {
    return
  }

  const { worker } = await import('./mocks/browser')

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start()
}

enableMocking().then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})
