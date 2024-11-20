import '@testing-library/jest-dom'
import { afterAll, afterEach, beforeAll } from 'vitest'

import { server } from '@/mocks/node'
import { createCache } from '@/utils/test-utils'

const queryCache = createCache()

beforeAll(() => {
  // Enable API mocking before all the tests.
  server.listen()
})

afterEach(() => {
  // Reset the request handlers between each test.
  // This way the handlers we add on a per-test basis
  // do not leak to other, irrelevant tests.
  server.resetHandlers()

  queryCache.clear()
})

afterAll(() => {
  // Finally, disable API mocking after the tests are done.
  server.close()
})
