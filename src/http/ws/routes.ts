import { FastifyInstance } from 'fastify'
import { pollResults } from './poll-results'

export const routesWs = async (route: FastifyInstance) => {
  route.get('/polls/:pollId/results', { websocket: true }, pollResults)
}