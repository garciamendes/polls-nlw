import { OptionsPoll, Poll } from '@prisma/client'
import { IPollRepository } from '../poll-repository'
import { randomUUID } from 'node:crypto'
import { ICreatePollAndCreateOptions, IParansGetDetailPoll } from '../types'

export class InMemoryPollRepository implements IPollRepository {
  public items: Poll[] = []
  public itemOptions: OptionsPoll[] = []

  async create({ title, options }: ICreatePollAndCreateOptions) {
    const poll = {
      id: randomUUID(),
      title: title,
      created: new Date(),
      modified: new Date()
    }

    this.items.push(poll)
    options.forEach(title => this.itemOptions.push({ title, pollId: poll.id, id: randomUUID() }))
    return poll
  }

  async pollById({ pollId }: IParansGetDetailPoll) {
    const poll = this.items.find(item => item.id === pollId)

    if (!poll) return null

    return poll
  }

}