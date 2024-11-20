import { HttpResponse, http } from 'msw'

import { server } from '@/mocks/node'
import { renderWithQueryClient } from '@/utils/test-utils'

import Article from './Article'

describe('Article', () => {
  const props = {
    selected: {
      id: '1',
      name: 'Query 1',
      description:
        '🤖 Powerful asynchronous state management, server-state utilities and data fetching for the web. TS/JS, React Query, Solid Query, Svelte Query and Vue Query.',
      subscribers_count: 187281,
      forks_count: 78,
      stargazers_count: 2,
    },
  }

  it('should render Article', async () => {
    const result = renderWithQueryClient(<Article {...props} />)
    const team01 = await result.findByText(/Powerful asynchronous state management/i)
    expect(team01).toBeInTheDocument()
  })

  it('should render loading state', async () => {
    const result = renderWithQueryClient(<Article {...props} />)
    const loading = await result.findByText(/Loading/i)
    expect(loading).toBeInTheDocument()
  })

  it('should render error state', async () => {
    server.use(
      http.get('/articles', () => {
        return new HttpResponse(null, { status: 500 })
      }),
    )
    const result = renderWithQueryClient(<Article {...props} />)
    const error = await result.findByText(/Error/i)
    expect(error).toBeInTheDocument()
  })
})
