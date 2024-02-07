import { FastifyInstance } from 'fastify'
import { createPoll } from './create'
import { findDetailPoll } from './getDetail'
import { voteOnPoll } from './voteOnPoll'

export const pollsRoutes = async (route: FastifyInstance) => {
  route.post('/', createPoll)
  route.get('/:pollId', findDetailPoll)
  route.post('/:pollId/vote', voteOnPoll)
}