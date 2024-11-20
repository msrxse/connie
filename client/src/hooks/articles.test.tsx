import { renderHook, waitFor } from '@testing-library/react'

import { createQueryHookWrapper } from '@/utils/test-utils'

import { useArticles } from './dashboard'

describe('getArticles', () => {
  it('should return articles', async () => {
    const { result } = renderHook(() => useArticles(), {
      wrapper: createQueryHookWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toHaveLength(4)
  })
})
