import userSchema from '../schemas/users'
import { userCache } from './cache'
import type { UserDocument } from '../schemas/users'

const getUser = async (email: string) => {
  let user: UserDocument | null = await userCache.get(email)

  if (user)
    return user

  user = await userSchema.findOne({ email })

  if (!user) return

  await userCache.set(email, user)

  return user
}

export default getUser
