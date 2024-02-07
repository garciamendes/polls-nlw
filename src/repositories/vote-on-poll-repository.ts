import { ICreateVote } from './types'

export interface IVoteOnPollRepository {
  voteOnPoll: ({ optionsPollId, pollId, sessionId }: ICreateVote) => Promise<void>
}