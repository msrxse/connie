import { HttpResponse, http } from 'msw'

const todoItems = [
  {
    id: '1',
    name: 'Query 1',
    description:
      '🤖 Powerful asynchronous state management, server-state utilities and data fetching for the web. TS/JS, React Query, Solid Query, Svelte Query and Vue Query.',
    subscribers_count: 187281,
    forks_count: 78,
  },
  {
    id: '2',
    name: 'Query 2',
    description:
      '🤖 Powerful asynchronous state management, server-state utilities and data fetching for the web. TS/JS, React Query, Solid Query, Svelte Query and Vue Query.',
    subscribers_count: 8971,
    forks_count: 98,
  },
  {
    id: '3',
    name: 'Query 3',
    description:
      '🤖 Powerful asynchronous state management, server-state utilities and data fetching for the web. TS/JS, React Query, Solid Query, Svelte Query and Vue Query.',
    subscribers_count: 7431,
    forks_count: 96,
  },
  {
    id: '4',
    name: 'Query 4',
    description:
      '🤖 Powerful asynchronous state management, server-state utilities and data fetching for the web. TS/JS, React Query, Solid Query, Svelte Query and Vue Query.',
    subscribers_count: 656769,
    forks_count: 4,
  },
]

const serverApi = 'http://localhost:8000'

export const handlers = [
  http.get('/', () => {
    return HttpResponse.json({})
  }),
  http.get(`${serverApi}/api/articles`, () => {
    return HttpResponse.json(todoItems)
  }),
  // ...other request handlers.
]
