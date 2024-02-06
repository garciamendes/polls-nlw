import Fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from '@/env'
import { pollsRoutes } from './http/controllers/poll/routes'

export const fastify = Fastify()

fastify.register(pollsRoutes, { prefix: 'api/poll' })

fastify.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error: ', issue: error.issues })
  }

  if (env.NODE_ENV !== 'production')
    console.error(error)

  return reply.status(500).send({ message: 'Internal server error' })
})