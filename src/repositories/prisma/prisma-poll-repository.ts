import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { IPollRepository } from '@/repositories/poll-repository'

export class PrismaPollsRepository implements IPollRepository {
  async create(data: Prisma.PollCreateInput) {
    const poll = await prisma.poll.create({ data })

    return poll
  }
}