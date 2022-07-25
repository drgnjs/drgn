import serverSchema from '../schemas/servers'
import { serverCache } from './cache'
import type { ServerDocument } from '../schemas/servers'

const getServer = async (_id: string) => {
  let server: ServerDocument | null = await serverCache.get(_id)

  if (server)
    return server

    server = await serverSchema.findOne({ _id })

  if (!server) return

  await serverCache.set(_id, server)

  return server
}

export default getServer
