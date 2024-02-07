import { ICreateVote } from '@/repositories/types'
import { IVoteOnPollRepository } from '@/repositories/vote-on-poll-repository'

export class VoteOnPollUseCase {
  constructor(private voteOnPollRepository: IVoteOnPollRepository) { }

  async execute({ pollId, optionsPollId, sessionId }: ICreateVote) {
    await this.voteOnPollRepository.voteOnPoll({ pollId, sessionId, optionsPollId })
  }
}