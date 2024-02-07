import { prisma } from '@/lib/prisma'
import { IPollRepository } from '@/repositories/poll-repository'
import { ICreatePollAndCreateOptions, IParansGetDetailPoll } from '../types'

export class PrismaPollsRepository implements IPollRepository {
  async create({ title, options }: ICreatePollAndCreateOptions) {
    const poll = await prisma.poll.create({
      data: {
        title,

        options: {
          createMany: {
            data: options.map(option => {
              return { title: option }
            })
          }
        }
      }
    })

    return poll
  }

  async pollById({ pollId }: IParansGetDetailPoll) {
    const poll = await prisma.poll.findUnique({
      where: { id: pollId },
      include: { options: {
        select: {
          id: true,
          title: true
        }
      } } })

    if (!poll) return null

    return poll
  }
}