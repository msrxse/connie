import { HttpResponse, http } from 'msw'

import { server } from '@/mocks/node'
import { renderWithQueryClient } from '@/utils/test-utils'

import List from './List'

describe('List', () => {
  const props = { setSelected: () => null }

  it('should render list', async () => {
    const result = renderWithQueryClient(<List {...props} />)
    const team01 = await result.findAllByText(/Powerful asynchronous state management/i)
    expect(team01).toHaveLength(4)
  })
  it('should render loading state', async () => {
    const result = renderWithQueryClient(<List {...props} />)
    const loading = await result.findByText(/Loading/i)
    expect(loading).toBeInTheDocument()
  })
  it('should render error state', async () => {
    server.use(
      http.get('/articles', () => {
        return new HttpResponse(null, { status: 500 })
      }),
    )
    const result = renderWithQueryClient(<List {...props} />)
    const error = await result.findByText(/Error/i)
    expect(error).toBeInTheDocument()
  })
})
