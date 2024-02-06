import { makeCreatePollUseCase } from '@/useCases/factories/make-create-poll-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z as zod } from 'zod'

export const createPoll = async (request: FastifyRequest, reply: FastifyReply) => {
  const createBody = zod.object({
    title: zod.string()
  })

  const { title } = createBody.parse(request.body)

  try {
    const createPollUseCase = makeCreatePollUseCase()

    const poll = await createPollUseCase.execute({ title })

    return reply.status(201).send(poll)
  } catch (error) {
    return reply.status(400).send({ message: 'Error trying create poll' })
  }
}