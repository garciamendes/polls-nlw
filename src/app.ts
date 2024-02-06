import Fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from '@/env'

export const fastify = Fastify()

fastify.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: 'Validation error: ', issue: error.format() })
  }

  if (env.NODE_ENV !== 'production')
    console.error(error)

  return reply.status(500).send({ message: 'Internal server error' })
})