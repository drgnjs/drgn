import { Type } from '@sinclair/typebox'
import { NodeSSH } from 'node-ssh'
import { serverCache } from '../modules/cache'
import encrypt from '../modules/encrypt'
import getUser from '../modules/getUser'
import validateSession from '../modules/validateSession'
import serverSchema from '../schemas/servers'
import type { UserDocument } from '../schemas/users'
import type { Router } from '../types'

const serverRouter = async (api: Router) => {
  api.addHook('preValidation', validateSession)

  api.get('/', async request => {
    const user = await getUser(request.user.email) as UserDocument

    const servers = await serverSchema.find({ user: user._id })

    return {
      servers
    }
  })

  api.post('/add', {
    schema: {
      body: Type.Object({
        host: Type.String({
          format: 'ipv4'
        }),
        port: Type.Number({
          minimum: 21,
          maximum: 22
        }),
        username: Type.String({
          minLength: 1,
          maxLength: 64
        }),
        password: Type.Optional(
          Type.String({
            minLength: 4,
            maxLength: 64
          })
        ),
        privateKey: Type.Optional(
          Type.String({
            minLength: 1000,
            maxLength: 5000
          })
        )
      })
    }
  }, async request => {
    if (!request.body.password && !request.body.privateKey)
      throw new Error('invalid credentials')

    try {
      const ssh = new NodeSSH()

      await ssh.connect({
        host: request.body.host,
        port: request.body.port,
        username: request.body.username,
        ...(request.body.password ? {
          password: request.body.password
        } : {
          privateKey: request.body.privateKey
        })
      })
    } catch (err) {
      throw new Error('could not connect to server')
    }

    if (await serverSchema.count({ credentials: { host: request.body.host, port: request.body.port }}) > 0)
      throw new Error('server added already')

    const server = new serverSchema({
      user: (await getUser(request.user.email) as UserDocument)._id,
      credentials: {
        host: request.body.host,
        port: request.body.port,
        username: request.body.username,
        ...(request.body.password ? {
          password: await encrypt(request.body.password)
        } : request.body.privateKey && {
          privateKey: await encrypt(request.body.privateKey)
        })
      }
    })

    await server.save()

    await serverCache.set(server._id, server)

    return {
      server
    }
  })

  /*
  api.delete('/:id/remove', {
    schema: {
      params: Type.Object({
        id: Type.String()
      })
    }
  }, async request => {
    const server = await getServer(request.params.id)

    if (!server)
      throw new Error('not found')

    const user = await getUser(request.user.email) as UserDocument

    if (server.user !== user._id)
      throw new Error('access denied')

    await serverCache.delete(request.params.id)
    await serverSchema.deleteOne({ _id: request.params.id })
  })
  */
}

export default serverRouter
