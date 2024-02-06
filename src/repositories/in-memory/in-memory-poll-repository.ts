import { Poll, Prisma } from '@prisma/client'
import { IPollRepository } from '../poll-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPollRepository implements IPollRepository {
  public items: Poll[] = []

  async create(data: Prisma.PollCreateInput) {
    const poll = {
      id: randomUUID(),
      title: data.title,
      created: new Date(),
      modified: new Date()
    }

    this.items.push(poll)

    return poll
  }

}