import { makeFindDetailPollUseCase } from '@/useCases/factories/make-find-detail-poll-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z as zod } from 'zod'

export const findDetailPoll = async (request: FastifyRequest, reply: FastifyReply) => {
  const paramsGet = zod.object({
    pollId: zod.string().uuid()
  })

  const { pollId } = paramsGet.parse(request.params)

  try {
    const findDetailPollUseCase = makeFindDetailPollUseCase()

    const poll = await findDetailPollUseCase.execute({ pollId })

    return reply.status(200).send(poll)
  } catch (error) {
    return reply.status(404).send(error)
  }
}