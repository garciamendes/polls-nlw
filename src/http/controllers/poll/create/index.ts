import { makeCreatePollUseCase } from '@/useCases/factories/make-create-poll-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z as zod } from 'zod'

export const createPoll = async (request: FastifyRequest, reply: FastifyReply) => {
  const createBody = zod.object({
    title: zod.string(),
    options: zod.array(zod.string())
  })

  const { title, options } = createBody.parse(request.body)

  try {
    const createPollUseCase = makeCreatePollUseCase()

    const poll = await createPollUseCase.execute({ title, options })

    return reply.status(201).send(poll)
  } catch (error) {
    return reply.status(400).send(error)
  }
}