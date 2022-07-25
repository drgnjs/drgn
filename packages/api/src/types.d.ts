import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyInstance } from 'fastify'
import '@fastify/jwt'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { [key: string]: any }
    user: {
      email: string
      [key: string]: any
    }
  }
}

export type Router = FastifyInstance<any, any, any, any, TypeBoxTypeProvider>
