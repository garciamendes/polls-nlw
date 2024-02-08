import { prisma } from '@/lib/prisma'
import { IPollRepository } from '@/repositories/poll-repository'
import { ICreatePollAndCreateOptions, IParansGetDetailPoll } from '../types'
import { redis } from '@/lib/redis'

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
      include: {
        options: {
          select: {
            id: true,
            title: true
          }
        }
      }
    })

    if (!poll) return null

    const result = await redis.zrange(pollId, 0, -1, 'WITHSCORES')
    const votes = result.reduce((obj, row, index) => {
      if (index % 2 === 0) {
        const score = result[index + 1]

        Object.assign(obj, { [row]: Number(score) })
      }

      return obj
    }, {} as Record<string, number>)

    const dataResult = {
      poll: {
        id: poll.id,
        title: poll.title,
        options: poll.options.map(option => {
          return {
            id: option.id,
            title: option.title,
            score: (option.id in votes) ? votes[option.id] : 0
          }
        })
      }
    }

    return dataResult
  }
}