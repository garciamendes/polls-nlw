import { Vote } from '@prisma/client'
import { ICreateVote } from '../types'
import { IVoteOnPollRepository } from '../vote-on-poll-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryVoteOnPollRepository implements IVoteOnPollRepository {
  public items: Vote[] = []

  async voteOnPoll({ optionsPollId, pollId, sessionId }: ICreateVote) {
    const vote = {
      id: randomUUID(),
      sessionId,
      optionsPollId,
      created: new Date(),
      pollId,
    }

    this.items.push(vote)
  }
}