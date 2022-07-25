import { MemoryCache } from 'cachu'

const unverifiedUserCache = new MemoryCache({
  autoclear: true
})

const userCache = new MemoryCache({
  autoclear: true
})

const serverCache = new MemoryCache({
  autoclear: true
})

const globalCache = new MemoryCache()

const loginAttemptsCache = new MemoryCache({
  maxAge: '1h'
})

export {
  globalCache,
  unverifiedUserCache,
  userCache,
  serverCache,
  loginAttemptsCache
}
