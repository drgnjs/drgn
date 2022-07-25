import type { FastifyRequest } from 'fastify'

const validateSession = async (request: FastifyRequest) => {
  try {
    await request.jwtVerify()
  } catch (err) {
    throw new Error('invalid session')
  }
}

export default validateSession
