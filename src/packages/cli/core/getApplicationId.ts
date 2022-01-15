import { customAlphabet } from 'nanoid/async'
import * as cache from './internalCacheManager'

const getApplicationId = async (directory: string) => {
  if (!(await cache.has(encodeURIComponent(directory))))
    return await cache.get(encodeURIComponent(directory)) 
  
  const nanoid = customAlphabet('1234567890abcdef', 16)
  const id = await nanoid()
  
  await cache.set(encodeURIComponent(directory), id)

  return id
}

export default getApplicationId