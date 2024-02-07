import { randomUUID } from 'node:crypto'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z as zod } from 'zod'
import { makeVoteOnPollUseCase } from '@/useCases/factories/make-create-vote-on-poll'
import { prisma } from '@/lib/prisma'

export const voteOnPoll = async (request: FastifyRequest, reply: FastifyReply) => {
  const voteOnPollBody = zod.object({
    pollOptionId: zod.string().uuid()
  })

  const voteOnPollParams = zod.object({
    pollId: zod.string().uuid(),
  })

  const { pollId } = voteOnPollParams.parse(request.params)
  const { pollOptionId } = voteOnPollBody.parse(request.body)

  let { sessionId } = request.cookies

  if (sessionId) {
    const userPreviousVoteOnPoll = await prisma.vote.findUnique({
      where: {
        sessionId_pollId: {
          sessionId,
          pollId
        }
      }
    })

    if (userPreviousVoteOnPoll && userPreviousVoteOnPoll.optionsPollId !== pollOptionId) {
      await prisma.vote.delete({
        where: {
          id: userPreviousVoteOnPoll.id
        }
      })

    } else if (userPreviousVoteOnPoll) {

      return reply.status(400).send({ message: 'You already voted on this poll' })
    }
  }

  if (!sessionId) {
    sessionId = randomUUID()

    reply.setCookie('sessionId', sessionId, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      signed: true,
      httpOnly: true
    })
  }

  try {
    const makeVoteOnPoll = makeVoteOnPollUseCase()

    await makeVoteOnPoll.execute({
      optionsPollId: pollOptionId, pollId, sessionId: sessionId as string
    })

    return reply.status(201).send()
  } catch (error) {
    return reply.status(404).send(error)
  }
}