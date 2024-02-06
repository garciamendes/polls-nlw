import { FastifyInstance } from 'fastify'
import { createPoll } from './create'

export const pollsRoutes = async (route: FastifyInstance) => {
  route.post('/', createPoll)
}