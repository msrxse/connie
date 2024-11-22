import { HttpResponse, http } from 'msw'

import { server } from '@/mocks/node'
import ActionsList from '@/scenes/components/List/ActionsList'
import { renderWithQueryClient } from '@/utils/test-utils'

describe('ActionsList', () => {
  const props = { setSelected: () => null }

  it('should render ActionsList', async () => {
    const result = renderWithQueryClient(<ActionsList {...props} />)
    const team01 = await result.findAllByText(/Powerful asynchronous state management/i)
    expect(team01).toHaveLength(4)
  })
  it('should render loading state', async () => {
    const result = renderWithQueryClient(<ActionsList {...props} />)
    const loading = await result.findByText(/Loading/i)
    expect(loading).toBeInTheDocument()
  })
  it('should render error state', async () => {
    server.use(
      http.get('/articles', () => {
        return new HttpResponse(null, { status: 500 })
      }),
    )
    const result = renderWithQueryClient(<ActionsList {...props} />)
    const error = await result.findByText(/Error/i)
    expect(error).toBeInTheDocument()
  })
})
